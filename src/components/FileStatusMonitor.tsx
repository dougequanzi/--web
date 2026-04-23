import React, { useState, useEffect } from 'react';
import { FileScanner, FileInfo } from '../utils/fileScanner';
import './FileStatusMonitor.css';

interface FileStatus {
  file: FileInfo;
  status: 'pending' | 'checking' | 'readable' | 'unreadable';
  error?: string;
  lastChecked: Date;
}

const FileStatusMonitor: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [statuses, setStatuses] = useState<FileStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [autoCheck, setAutoCheck] = useState<boolean>(true);
  const [checkInterval, setCheckInterval] = useState<number>(30); // 秒

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (autoCheck && files.length > 0) {
      // 初始检查
      checkAllFiles();
      
      // 设置定时检查
      intervalId = setInterval(() => {
        checkAllFiles();
      }, checkInterval * 1000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoCheck, checkInterval, files]);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const categories = await FileScanner.scanDataDirectory();
      const allFiles: FileInfo[] = [];
      
      categories.forEach(category => {
        allFiles.push(...category.files);
        Object.values(category.subcategories).forEach(subFiles => {
          allFiles.push(...subFiles);
        });
      });
      
      setFiles(allFiles);
      
      // 初始化状态
      const initialStatuses: FileStatus[] = allFiles.map(file => ({
        file,
        status: 'pending',
        lastChecked: new Date()
      }));
      
      setStatuses(initialStatuses);
    } catch (error: any) {
      console.error('加载文件失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAllFiles = async () => {
    const newStatuses: FileStatus[] = await Promise.all(
      statuses.map(async (status) => {
        try {
          const result = await FileScanner.checkFileReadable(status.file.fullPath);
          return {
            ...status,
            status: result.readable ? 'readable' : 'unreadable' as FileStatus['status'],
            error: result.error,
            lastChecked: new Date()
          };
        } catch (error: any) {
          return {
            ...status,
            status: 'unreadable' as FileStatus['status'],
            error: error.message || '检查文件时出错',
            lastChecked: new Date()
          };
        }
      })
    );
    
    setStatuses(newStatuses);
  };

  const checkSingleFile = async (file: FileInfo) => {
    const index = statuses.findIndex(s => s.file.path === file.path);
    if (index === -1) return;
    
    const newStatuses = [...statuses];
    newStatuses[index] = {
      ...newStatuses[index],
      status: 'checking'
    };
    setStatuses(newStatuses);
    
    try {
      const result = await FileScanner.checkFileReadable(file.fullPath);
      newStatuses[index] = {
        ...newStatuses[index],
        status: result.readable ? 'readable' : 'unreadable',
        error: result.error,
        lastChecked: new Date()
      };
    } catch (error: any) {
      newStatuses[index] = {
        ...newStatuses[index],
        status: 'unreadable',
        error: error.message || '检查文件时出错',
        lastChecked: new Date()
      };
    }
    
    setStatuses(newStatuses);
  };

  const getStatusIcon = (status: FileStatus['status']) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'checking': return '🔍';
      case 'readable': return '✅';
      case 'unreadable': return '❌';
      default: return '❓';
    }
  };

  const getStatusColor = (status: FileStatus['status']) => {
    switch (status) {
      case 'pending': return '#ff9800';
      case 'checking': return '#2196f3';
      case 'readable': return '#4caf50';
      case 'unreadable': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getStatusText = (status: FileStatus['status']) => {
    switch (status) {
      case 'pending': return '待检查';
      case 'checking': return '检查中';
      case 'readable': return '可读取';
      case 'unreadable': return '不可读';
      default: return '未知';
    }
  };

  const readableCount = statuses.filter(s => s.status === 'readable').length;
  const unreadableCount = statuses.filter(s => s.status === 'unreadable').length;
  const checkingCount = statuses.filter(s => s.status === 'checking').length;
  const pendingCount = statuses.filter(s => s.status === 'pending').length;

  if (loading) {
    return (
      <div className="file-status-monitor loading">
        <div className="loading-spinner"></div>
        <p>正在加载文件状态...</p>
      </div>
    );
  }

  return (
    <div className="file-status-monitor">
      <div className="monitor-header">
        <h2>文件状态监控</h2>
        <div className="header-controls">
          <div className="auto-check-control">
            <label>
              <input
                type="checkbox"
                checked={autoCheck}
                onChange={(e) => setAutoCheck(e.target.checked)}
              />
              自动检查
            </label>
            {autoCheck && (
              <div className="interval-control">
                <span>检查间隔:</span>
                <select
                  value={checkInterval}
                  onChange={(e) => setCheckInterval(Number(e.target.value))}
                >
                  <option value={10}>10秒</option>
                  <option value={30}>30秒</option>
                  <option value={60}>1分钟</option>
                  <option value={300}>5分钟</option>
                </select>
              </div>
            )}
          </div>
          <button onClick={checkAllFiles} className="check-all-btn">
            🔄 立即检查所有文件
          </button>
        </div>
      </div>

      <div className="status-summary">
        <div className="summary-card readable">
          <div className="summary-count">{readableCount}</div>
          <div className="summary-label">可读取文件</div>
        </div>
        <div className="summary-card unreadable">
          <div className="summary-count">{unreadableCount}</div>
          <div className="summary-label">不可读文件</div>
        </div>
        <div className="summary-card checking">
          <div className="summary-count">{checkingCount}</div>
          <div className="summary-label">检查中</div>
        </div>
        <div className="summary-card pending">
          <div className="summary-count">{pendingCount}</div>
          <div className="summary-label">待检查</div>
        </div>
        <div className="summary-card total">
          <div className="summary-count">{statuses.length}</div>
          <div className="summary-label">总文件数</div>
        </div>
      </div>

      <div className="file-list">
        <div className="list-header">
          <h3>文件状态详情</h3>
          <div className="list-stats">
            <span className="last-update">
              最后更新: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="file-table">
          <div className="table-header">
            <div className="header-cell status">状态</div>
            <div className="header-cell name">文件名</div>
            <div className="header-cell type">类型</div>
            <div className="header-cell category">分类</div>
            <div className="header-cell last-checked">最后检查</div>
            <div className="header-cell actions">操作</div>
          </div>

          <div className="table-body">
            {statuses.map((status, index) => (
              <div key={index} className="table-row">
                <div className="table-cell status">
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(status.status) }}
                  >
                    {getStatusIcon(status.status)} {getStatusText(status.status)}
                  </span>
                </div>
                <div className="table-cell name">
                  <div className="file-name">{status.file.name}</div>
                  <div className="file-path">{status.file.path}</div>
                </div>
                <div className="table-cell type">
                  <span className="type-badge">
                    {FileScanner.getFileIcon(status.file.type)} {FileScanner.getFileTypeLabel(status.file.type)}
                  </span>
                </div>
                <div className="table-cell category">
                  {status.file.category}
                  {status.file.subcategory && (
                    <div className="subcategory">{status.file.subcategory}</div>
                  )}
                </div>
                <div className="table-cell last-checked">
                  {status.lastChecked.toLocaleTimeString()}
                </div>
                <div className="table-cell actions">
                  <button
                    onClick={() => checkSingleFile(status.file)}
                    className="action-btn check-btn"
                    disabled={status.status === 'checking'}
                  >
                    {status.status === 'checking' ? '检查中...' : '检查'}
                  </button>
                  {status.status === 'unreadable' && status.error && (
                    <div className="error-tooltip" title={status.error}>
                      ⚠️
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {unreadableCount > 0 && (
          <div className="unreadable-files">
            <h4>⚠️ 不可读文件列表</h4>
            <div className="error-list">
              {statuses
                .filter(s => s.status === 'unreadable')
                .map((status, index) => (
                  <div key={index} className="error-item">
                    <div className="error-file">
                      <strong>{status.file.name}</strong>
                      <span className="error-path">{status.file.path}</span>
                    </div>
                    <div className="error-message">{status.error}</div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="monitor-footer">
        <div className="footer-info">
          <p>
            <strong>监控说明:</strong> 系统会自动检查文件可读性，遇到不可读文件时会及时反馈
          </p>
          <p>
            建议定期检查文件状态，确保所有文件都能正常访问
          </p>
        </div>
        <button onClick={loadFiles} className="refresh-btn">
          🔄 刷新文件列表
        </button>
      </div>
    </div>
  );
};

export default FileStatusMonitor;