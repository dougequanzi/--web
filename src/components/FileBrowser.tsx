import React, { useState, useEffect } from 'react';
import { FileScanner, FileInfo, CategoryInfo } from '../utils/fileScanner';
import './FileBrowser.css';

interface FileBrowserProps {
  categoryId?: string;
  onFileSelect?: (file: FileInfo) => void;
  showImages?: boolean;
  showDocuments?: boolean;
}

const FileBrowser: React.FC<FileBrowserProps> = ({
  categoryId,
  onFileSelect,
  showImages = true,
  showDocuments = true
}) => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [fileTypeFilter, setFileTypeFilter] = useState<string>('all');

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (categoryId && categories.length > 0) {
      const category = categories.find(cat => cat.id === categoryId);
      if (category) {
        setSelectedCategory(category);
      }
    }
  }, [categoryId, categories]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const scannedCategories = await FileScanner.scanDataDirectory();
      setCategories(scannedCategories);
      
      if (!categoryId && scannedCategories.length > 0) {
        setSelectedCategory(scannedCategories[0]);
      }
    } catch (err: any) {
      setError(`扫描文件时出错: ${err.message}`);
      console.error('文件扫描错误:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category: CategoryInfo) => {
    setSelectedCategory(category);
  };

  const handleFileClick = (file: FileInfo) => {
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleFileReadCheck = async (file: FileInfo) => {
    try {
      const result = await FileScanner.checkFileReadable(file.fullPath);
      if (!result.readable) {
        alert(`无法读取文件: ${file.name}\n错误: ${result.error}`);
        return false;
      }
      return true;
    } catch (err: any) {
      alert(`检查文件时出错: ${err.message}`);
      return false;
    }
  };

  const filteredFiles = selectedCategory ? 
    selectedCategory.files.filter(file => {
      // 搜索过滤
      const matchesSearch = searchTerm === '' || 
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.path.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 文件类型过滤
      const matchesType = fileTypeFilter === 'all' || file.type === fileTypeFilter;
      
      // 显示类型过滤
      const shouldShow = (showImages && file.type === 'image') ||
                        (showDocuments && file.type !== 'image') ||
                        (!showImages && !showDocuments);
      
      return matchesSearch && matchesType && shouldShow;
    }) : [];

  const getFileTypeColor = (type: FileInfo['type']): string => {
    const colors = {
      'image': '#4caf50',
      'pdf': '#f44336',
      'document': '#2196f3',
      'excel': '#388e3c',
      'json': '#ff9800',
      'other': '#9e9e9e'
    };
    return colors[type];
  };

  const getFileTypeLabel = (type: FileInfo['type']): string => {
    const labels = {
      'image': '图片',
      'pdf': 'PDF文档',
      'document': 'Word文档',
      'excel': 'Excel表格',
      'json': 'JSON数据',
      'other': '其他文件'
    };
    return labels[type];
  };

  if (loading) {
    return (
      <div className="file-browser loading">
        <div className="loading-spinner"></div>
        <p>正在扫描文件目录...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="file-browser error">
        <div className="error-icon">❌</div>
        <h3>文件扫描失败</h3>
        <p>{error}</p>
        <button onClick={loadCategories} className="retry-btn">
          重试扫描
        </button>
      </div>
    );
  }

  return (
    <div className="file-browser">
      <div className="browser-header">
        <h2>文件浏览器</h2>
        <div className="header-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="搜索文件..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filter-controls">
            <select
              value={fileTypeFilter}
              onChange={(e) => setFileTypeFilter(e.target.value)}
              className="type-filter"
            >
              <option value="all">所有类型</option>
              <option value="image">图片文件</option>
              <option value="pdf">PDF文档</option>
              <option value="document">Word文档</option>
              <option value="excel">Excel表格</option>
              <option value="json">JSON数据</option>
            </select>
          </div>
        </div>
      </div>

      <div className="browser-content">
        <div className="category-sidebar">
          <h3>文件分类</h3>
          <div className="category-list">
            {categories.map(category => (
              <div
                key={category.id}
                className={`category-item ${selectedCategory?.id === category.id ? 'active' : ''}`}
                onClick={() => handleCategorySelect(category)}
              >
                <div className="category-icon">
                  {FileScanner.getFileIcon(category.files[0]?.type || 'other')}
                </div>
                <div className="category-info">
                  <div className="category-name">{category.name}</div>
                  <div className="category-desc">{category.description}</div>
                  <div className="category-stats">
                    <span className="file-count">{category.files.length} 个文件</span>
                    {Object.keys(category.subcategories).length > 0 && (
                      <span className="subcategory-count">
                        {Object.keys(category.subcategories).length} 个子分类
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="file-content">
          <div className="content-header">
            <h3>
              {selectedCategory?.name || '选择分类'}
              <span className="file-count-badge">{filteredFiles.length} 个文件</span>
            </h3>
            <div className="file-stats">
              <div className="stat-item">
                <span className="stat-label">总大小:</span>
                <span className="stat-value">
                  {FileScanner.formatFileSize(
                    filteredFiles.reduce((sum, file) => sum + file.size, 0)
                  )}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">文件类型:</span>
                <div className="type-tags">
                  {Array.from(new Set(filteredFiles.map(f => f.type))).map(type => (
                    <span
                      key={type}
                      className="type-tag"
                      style={{ backgroundColor: getFileTypeColor(type) }}
                    >
                      {getFileTypeLabel(type)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {filteredFiles.length === 0 ? (
            <div className="empty-files">
              <div className="empty-icon">📁</div>
              <h4>没有找到文件</h4>
              <p>请尝试调整搜索条件或选择其他分类</p>
            </div>
          ) : (
            <div className="file-grid">
              {filteredFiles.map(file => (
                <div
                  key={`${file.path}-${file.name}`}
                  className="file-card"
                  onClick={() => handleFileClick(file)}
                >
                  <div className="file-header">
                    <div className="file-icon" style={{ color: getFileTypeColor(file.type) }}>
                      {FileScanner.getFileIcon(file.type)}
                    </div>
                    <div className="file-type" style={{ backgroundColor: getFileTypeColor(file.type) }}>
                      {getFileTypeLabel(file.type)}
                    </div>
                  </div>
                  
                  <div className="file-body">
                    <h4 className="file-name" title={file.name}>
                      {file.name}
                    </h4>
                    <p className="file-path" title={file.path}>
                      {file.path}
                    </p>
                    <div className="file-meta">
                      <span className="meta-item">
                        📏 {FileScanner.formatFileSize(file.size)}
                      </span>
                      <span className="meta-item">
                        📁 {file.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="file-actions">
                    <button
                      className="action-btn preview-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileClick(file);
                      }}
                    >
                      预览
                    </button>
                    <button
                      className="action-btn check-btn"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const readable = await handleFileReadCheck(file);
                        if (readable) {
                          alert(`文件 "${file.name}" 可以正常读取`);
                        }
                      }}
                    >
                      检查
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 子分类显示 */}
          {selectedCategory && Object.keys(selectedCategory.subcategories).length > 0 && (
            <div className="subcategories-section">
              <h4>子分类文件</h4>
              {Object.entries(selectedCategory.subcategories).map(([subcatName, subcatFiles]) => (
                <div key={subcatName} className="subcategory-group">
                  <h5 className="subcategory-title">{subcatName}</h5>
                  <div className="subcategory-files">
                    {subcatFiles.map(file => (
                      <div
                        key={`${file.path}-${file.name}`}
                        className="subcategory-file"
                        onClick={() => handleFileClick(file)}
                      >
                        <span className="file-icon-small">
                          {FileScanner.getFileIcon(file.type)}
                        </span>
                        <span className="file-name-small">{file.name}</span>
                        <span className="file-size-small">
                          {FileScanner.formatFileSize(file.size)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="browser-footer">
        <div className="footer-info">
          <p>
            <strong>提示:</strong> 点击文件可以预览，点击"检查"按钮可以验证文件是否可读
          </p>
          <p>
            当前扫描到 {categories.length} 个分类，共{' '}
            {categories.reduce((sum, cat) => sum + cat.files.length, 0)} 个文件
          </p>
        </div>
        <button onClick={loadCategories} className="refresh-btn">
          🔄 刷新文件列表
        </button>
      </div>
    </div>
  );
};

export default FileBrowser;