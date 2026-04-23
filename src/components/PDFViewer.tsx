import React, { useState, useEffect } from 'react';
import './PDFViewer.css';

interface PDFViewerProps {
  filePath?: string;
  fileName?: string;
  title?: string;
  description?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ 
  filePath, 
  fileName, 
  title = 'PDF文档',
  description 
}) => {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [pageNum, setPageNum] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  // 模拟PDF数据
  const mockPDFs = [
    {
      id: '1',
      name: '14街道.pdf',
      path: '2. 街道委员小组/14街道.pdf',
      description: '上城区14个街道委员小组组织架构和工作情况',
      size: '36.5 MB'
    },
    {
      id: '2',
      name: '评定表.pdf',
      path: '6. 星级委员评定/评定表.pdf',
      description: '委员履职星级评定标准与评分表',
      size: '1.0 MB'
    }
  ];

  const currentPDF = mockPDFs.find(pdf => 
    pdf.path === filePath || pdf.name === fileName
  ) || mockPDFs[0];

  useEffect(() => {
    // 模拟加载PDF
    setLoading(true);
    setError('');
    
    // 在实际应用中，这里应该从服务器获取PDF文件
    // 这里使用模拟的PDF URL
    const timer = setTimeout(() => {
      if (currentPDF) {
        // 使用一个在线的PDF示例，实际应该使用实际文件
        setPdfUrl('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
        setLoading(false);
      } else {
        setError('未找到指定的PDF文件');
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [filePath, fileName, currentPDF]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setScale(1.0);
  };

  const handlePrevPage = () => {
    setPageNum(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPageNum(prev => prev + 1);
  };

  const handleDownload = () => {
    // 模拟下载
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = currentPDF.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pdf-viewer">
      <div className="pdf-header">
        <div className="pdf-info">
          <h2>{title}</h2>
          {description && <p className="pdf-description">{description}</p>}
          <div className="pdf-meta">
            <span className="meta-item">📄 {currentPDF.name}</span>
            <span className="meta-item">📊 {currentPDF.size}</span>
            <span className="meta-item">📁 {currentPDF.path}</span>
          </div>
        </div>
        
        <div className="pdf-controls">
          <button 
            className="control-btn" 
            onClick={handleZoomOut}
            title="缩小"
          >
            🔍−
          </button>
          <span className="scale-display">{Math.round(scale * 100)}%</span>
          <button 
            className="control-btn" 
            onClick={handleZoomIn}
            title="放大"
          >
            🔍+
          </button>
          <button 
            className="control-btn" 
            onClick={handleResetZoom}
            title="重置缩放"
          >
            ↺
          </button>
          <div className="page-controls">
            <button 
              className="control-btn" 
              onClick={handlePrevPage}
              disabled={pageNum === 1}
              title="上一页"
            >
              ◀
            </button>
            <span className="page-display">第 {pageNum} 页</span>
            <button 
              className="control-btn" 
              onClick={handleNextPage}
              title="下一页"
            >
              ▶
            </button>
          </div>
          <button 
            className="control-btn download-btn" 
            onClick={handleDownload}
            title="下载PDF"
          >
            ⬇ 下载
          </button>
        </div>
      </div>

      <div className="pdf-content">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>正在加载PDF文档...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">❌</div>
            <h3>加载失败</h3>
            <p>{error}</p>
            <div className="pdf-preview">
              <div className="preview-placeholder">
                <div className="preview-icon">📄</div>
                <h4>{currentPDF.name}</h4>
                <p>{currentPDF.description}</p>
                <p className="preview-size">文件大小: {currentPDF.size}</p>
                <p className="preview-path">路径: {currentPDF.path}</p>
                <button className="preview-download" onClick={handleDownload}>
                  下载文件
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="pdf-container">
            <div className="pdf-frame-container" style={{ transform: `scale(${scale})` }}>
              <iframe
                src={`${pdfUrl}#page=${pageNum}`}
                title={currentPDF.name}
                className="pdf-frame"
                style={{ width: `${100 / scale}%`, height: `${100 / scale}%` }}
              />
            </div>
            
            {/* 备用预览 */}
            <div className="pdf-preview">
              <div className="preview-info">
                <h4>PDF预览</h4>
                <p>如果PDF无法正常显示，您可以：</p>
                <ul>
                  <li>点击右上角的下载按钮下载文件</li>
                  <li>使用缩放控制调整查看大小</li>
                  <li>使用翻页按钮浏览文档</li>
                </ul>
                <div className="preview-details">
                  <p><strong>文件名:</strong> {currentPDF.name}</p>
                  <p><strong>文件大小:</strong> {currentPDF.size}</p>
                  <p><strong>文件路径:</strong> {currentPDF.path}</p>
                  <p><strong>文件描述:</strong> {currentPDF.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pdf-footer">
        <div className="file-list">
          <h4>其他PDF文档</h4>
          <div className="file-items">
            {mockPDFs.map(pdf => (
              <div 
                key={pdf.id} 
                className={`file-item ${pdf.id === currentPDF.id ? 'active' : ''}`}
                onClick={() => {
                  // 在实际应用中，这里应该切换PDF
                  setPageNum(1);
                  setScale(1.0);
                }}
              >
                <div className="file-icon">📄</div>
                <div className="file-details">
                  <div className="file-name">{pdf.name}</div>
                  <div className="file-size">{pdf.size}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="viewer-info">
          <p>PDF查看器支持缩放、翻页和下载功能</p>
          <p>如果遇到显示问题，请尝试下载文件后使用本地PDF阅读器查看</p>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;