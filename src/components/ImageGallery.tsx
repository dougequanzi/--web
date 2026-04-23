import React, { useState, useEffect } from 'react';
import './ImageGallery.css';

interface ImageItem {
  id: string;
  src: string;
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  category?: string;
  title?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, category, title }) => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>(images);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // 获取所有子分类
  const subcategories = React.useMemo(() => {
    const subs = new Set<string>();
    images.forEach(img => {
      if (img.subcategory) {
        subs.add(img.subcategory);
      }
    });
    return Array.from(subs);
  }, [images]);

  // 过滤图片
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.subcategory === activeFilter));
    }
  }, [activeFilter, images]);

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // 模拟图片数据 - 实际应该从服务器获取
  const mockImages: ImageItem[] = [
    {
      id: '1',
      src: 'https://via.placeholder.com/400x300/1a237e/ffffff?text=中共界别活动',
      title: '中共界别委员活动',
      description: '2022年12月6日，中共界别委员开展专题学习活动',
      category: '界别基本情况',
      subcategory: '中共界别'
    },
    {
      id: '2',
      src: 'https://via.placeholder.com/400x300/3949ab/ffffff?text=经济界别调研',
      title: '经济界别企业调研',
      description: '委员走访高新技术企业，调研产业发展情况',
      category: '界别基本情况',
      subcategory: '经济界别'
    },
    {
      id: '3',
      src: 'https://via.placeholder.com/400x300/2196f3/ffffff?text=教育界别座谈',
      title: '教育界别座谈会',
      description: '教育界别委员与学校代表座谈交流',
      category: '界别基本情况',
      subcategory: '教育界别'
    },
    {
      id: '4',
      src: 'https://via.placeholder.com/400x300/4caf50/ffffff?text=医卫界别服务',
      title: '医卫界别义诊活动',
      description: '医卫界别委员开展社区义诊服务',
      category: '界别基本情况',
      subcategory: '医卫界别'
    },
    {
      id: '5',
      src: 'https://via.placeholder.com/400x300/ff9800/ffffff?text=社会福利活动',
      title: '社会福利界别慰问',
      description: '委员走访慰问困难群众',
      category: '界别基本情况',
      subcategory: '社会福利和保障界别'
    },
    {
      id: '6',
      src: 'https://via.placeholder.com/400x300/9c27b0/ffffff?text=文化交流活动',
      title: '文化交流活动',
      description: '委员参与传统文化交流活动',
      category: '界别基本情况',
      subcategory: '新闻文体界别'
    }
  ];

  const displayImages = images.length > 0 ? filteredImages : mockImages;

  return (
    <div className="image-gallery">
      <div className="gallery-header">
        <h2>{title || `${category || '活动'}照片`}</h2>
        {subcategories.length > 0 && (
          <div className="filter-controls">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              全部
            </button>
            {subcategories.map(sub => (
              <button
                key={sub}
                className={`filter-btn ${activeFilter === sub ? 'active' : ''}`}
                onClick={() => setActiveFilter(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
        <p className="image-count">共 {displayImages.length} 张照片</p>
      </div>

      <div className="gallery-grid">
        {displayImages.map(image => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => handleImageClick(image)}
          >
            <div className="image-container">
              <img
                src={image.src}
                alt={image.title}
                loading="lazy"
                className="gallery-image"
              />
              <div className="image-overlay">
                <div className="image-title">{image.title}</div>
                {image.subcategory && (
                  <div className="image-category">{image.subcategory}</div>
                )}
              </div>
            </div>
            <div className="image-info">
              <h4>{image.title}</h4>
              {image.description && <p>{image.description}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* 图片查看模态框 */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="modal-image"
            />
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              {selectedImage.description && <p>{selectedImage.description}</p>}
              <div className="modal-meta">
                <span className="meta-item">分类: {selectedImage.category}</span>
                {selectedImage.subcategory && (
                  <span className="meta-item">子分类: {selectedImage.subcategory}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {displayImages.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🖼️</div>
          <h3>暂无照片</h3>
          <p>当前分类下没有可显示的照片</p>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;