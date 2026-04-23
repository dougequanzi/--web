import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// 导入实际数据
import performanceData from './data/performanceData.json';

// 导入新组件
import ImageGallery from './components/ImageGallery';
import PDFViewer from './components/PDFViewer';
import FileBrowser from './components/FileBrowser';
import FileStatusMonitor from './components/FileStatusMonitor';

// 页面组件
const HomePage = () => (
  <div className="page">
    <h1>上城区政协委员通</h1>
    <p>杭州市上城区政协委员信息管理与履职平台</p>
    <div className="features">
      <h3>系统功能模块：</h3>
      <ul>
        <li><strong>委员之家</strong> - 委员基本信息与档案管理</li>
        <li><strong>街道委员小组</strong> - 14个街道委员小组组织管理</li>
        <li><strong>界别基本情况</strong> - 16个政协界别信息与活动管理</li>
        <li><strong>委员履职平台</strong> - 50个委员工作室履职记录与统计</li>
        <li><strong>政协界别委员联系界别群众实践</strong> - 南城发展专题</li>
        <li><strong>星级委员评定</strong> - 委员履职星级评定管理</li>
        <li><strong>2026年度履职计划</strong> - 年度工作计划与目标管理</li>
        <li><strong>文件浏览器</strong> - 浏览和管理所有文件、图片和文档</li>
        <li><strong>文件状态监控</strong> - 实时监控文件可读性，及时反馈问题</li>
      </ul>
    </div>
    <div className="stats">
      <h3>平台概览：</h3>
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-number">50</div>
          <div className="stat-label">委员工作室</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">14</div>
          <div className="stat-label">街道小组</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">16</div>
          <div className="stat-label">政协界别</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">25</div>
          <div className="stat-label">五星工作室</div>
        </div>
      </div>
    </div>

    <div className="section">
      <h3>文件状态监控</h3>
      <p>实时监控数据目录中所有文件的可读性状态</p>
      <FileStatusMonitor />
    </div>

    <div className="section">
      <h3>系统特色功能</h3>
      <div className="feature-grid">
        <div className="feature-card">
          <h4>🖼️ 图片浏览</h4>
          <p>支持界别活动照片的浏览、筛选和放大查看</p>
        </div>
        <div className="feature-card">
          <h4>📄 PDF嵌入</h4>
          <p>PDF文档直接嵌入网页，支持缩放、翻页和下载</p>
        </div>
        <div className="feature-card">
          <h4>🔍 文件检查</h4>
          <p>自动检查文件可读性，遇到问题及时反馈</p>
        </div>
        <div className="feature-card">
          <h4>📁 文件管理</h4>
          <p>完整的文件浏览器，支持搜索、过滤和分类查看</p>
        </div>
      </div>
    </div>
  </div>
);

interface CommitteeMember {
  id: number;
  name: string;
  position: string;
  street: string;
}

interface Studio {
  id: number;
  name: string;
  leader: string;
  address: string;
}

interface PlatformStats {
  total_studios: number;
  coverage: string;
  annual_rating: boolean;
  star_ratings_2025: {
    five_star: number;
    four_star: number;
    three_star: number;
  };
}

const CommitteeHomePage = () => {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  
  useEffect(() => {
    // 这里可以加载委员数据
    // 暂时使用模拟数据
    const mockMembers: CommitteeMember[] = [
      { id: 1, name: '查靖', position: '政协湖滨小组委员工作室负责人', street: '湖滨街道' },
      { id: 2, name: '徐洁', position: '政协清波小组委员工作室负责人', street: '清波街道' },
      { id: 3, name: '冷晓辉', position: '政协小营小组委员工作室负责人', street: '小营街道' },
      { id: 4, name: '毛静波', position: '政协望江小组委员工作室负责人', street: '望江街道' },
      { id: 5, name: '游广敏', position: '政协南星小组委员工作室负责人', street: '南星街道' },
    ];
    setMembers(mockMembers);
  }, []);

  return (
    <div className="page">
      <h1>委员之家</h1>
      <p>上城区政协委员基本信息与档案管理</p>
      
      <div className="content">
        <div className="section">
          <h3>委员列表</h3>
          <div className="member-grid">
            {members.map(member => (
              <div key={member.id} className="member-card">
                <div className="member-avatar">{member.name.charAt(0)}</div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p>{member.position}</p>
                  <p className="member-street">{member.street}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>委员档案管理</h3>
          <ul>
            <li>委员个人信息登记与更新</li>
            <li>委员通讯录与联系方式管理</li>
            <li>委员分组与界别归属管理</li>
            <li>委员履职档案电子化管理</li>
            <li>委员统计报表与分析</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const StreetCommitteePage = () => {
  const streets = [
    '湖滨街道', '清波街道', '小营街道', '望江街道', '南星街道',
    '紫阳街道', '闸弄口街道', '凯旋街道', '采荷街道', '四季青街道',
    '笕桥街道', '彭埠街道', '九堡街道', '丁兰街道'
  ];

  return (
    <div className="page">
      <h1>街道委员小组</h1>
      <p>上城区14个街道委员小组组织管理与活动记录</p>
      
      <div className="content">
        <div className="section">
          <h3>14个街道委员小组</h3>
          <div className="street-grid">
            {streets.map((street, index) => (
              <div key={index} className="street-card">
                <div className="street-number">{index + 1}</div>
                <div className="street-name">{street}</div>
                <div className="street-info">
                  <p>委员工作室全覆盖</p>
                  <p>年度履职活动记录</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>街道小组工作内容</h3>
          <ul>
            <li>街道委员小组组织架构管理</li>
            <li>小组活动计划与记录</li>
            <li>街道层面协商议事</li>
            <li>委员联系群众工作</li>
            <li>街道特色品牌建设</li>
            <li>工作成效统计与评估</li>
          </ul>
        </div>

        <div className="section">
          <h3>特色工作</h3>
          <div className="feature-list">
            <div className="feature-item">
              <h4>向基层延伸覆盖</h4>
              <p>实现履职平台街道委员小组全覆盖</p>
            </div>
            <div className="feature-item">
              <h4>不建机构建机制</h4>
              <p>强化委员工作室"三位一体"建设</p>
            </div>
            <div className="feature-item">
              <h4>一室一品</h4>
              <p>打造各具特色的委员工作室品牌</p>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>街道委员小组PDF文档</h3>
          <PDFViewer 
            filePath="2. 街道委员小组/14街道.pdf"
            title="14个街道委员小组组织架构"
            description="详细介绍了上城区14个街道委员小组的组织架构、工作职责和活动情况"
          />
        </div>

        <div className="section">
          <h3>街道文件管理</h3>
          <FileBrowser 
            categoryId="street-committee"
            showImages={false}
            showDocuments={true}
          />
        </div>
      </div>
    </div>
  );
};

const CategoryInfoPage = () => {
  const categories = [
    { id: 1, name: '中共', code: '01', count: 25 },
    { id: 2, name: '民革', code: '02', count: 15 },
    { id: 3, name: '民盟、民进', code: '03', count: 18 },
    { id: 4, name: '工会', code: '04', count: 12 },
    { id: 5, name: '妇联', code: '05', count: 10 },
    { id: 6, name: '青联', code: '06', count: 8 },
    { id: 7, name: '科技、科协', code: '07', count: 20 },
    { id: 8, name: '侨、台', code: '08', count: 15 },
    { id: 9, name: '新闻文体', code: '09', count: 12 },
    { id: 10, name: '经济', code: '10', count: 30 },
    { id: 11, name: '环境资源和农业', code: '11', count: 10 },
    { id: 12, name: '教育', code: '12', count: 25 },
    { id: 13, name: '医卫', code: '13', count: 20 },
    { id: 14, name: '社会福利和保障', code: '14', count: 15 },
    { id: 15, name: '民宗', code: '15', count: 8 },
    { id: 16, name: '特邀', code: '16', count: 20 },
  ];

  return (
    <div className="page">
      <h1>界别基本情况</h1>
      <p>上城区政协16个界别信息管理与活动记录</p>
      
      <div className="content">
        <div className="section">
          <h3>政协界别分类</h3>
          <div className="category-grid">
            {categories.map(category => (
              <div key={category.id} className="category-card">
                <div className="category-header">
                  <span className="category-code">{category.code}</span>
                  <h4>{category.name}</h4>
                </div>
                <div className="category-body">
                  <p>委员人数: <strong>{category.count}</strong> 人</p>
                  <p>界别活动: 定期开展</p>
                  <p>联系群众: 常态化</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>界别工作重点</h3>
          <ul>
            <li>界别委员组织与管理</li>
            <li>界别特色活动开展</li>
            <li>界别群众联系工作</li>
            <li>界别协商议事</li>
            <li>界别调研与提案</li>
            <li>界别活动照片管理</li>
          </ul>
        </div>

        <div className="section">
          <h3>界别活动照片</h3>
          <ImageGallery 
            images={[]}
            category="界别基本情况"
            title="政协界别活动照片"
          />
        </div>

        <div className="section">
          <h3>界别文件管理</h3>
          <FileBrowser 
            categoryId="category-info"
            showImages={true}
            showDocuments={true}
          />
        </div>
      </div>
    </div>
  );
};

const PerformancePlatformPage = () => {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [stats, setStats] = useState<PlatformStats | null>(null);

  useEffect(() => {
    // 使用实际数据
    const data = performanceData as any;
    setStudios(data.studios.slice(0, 10)); // 显示前10个
    setStats(data.statistics);
  }, []);

  return (
    <div className="page">
      <h1>委员履职平台</h1>
      <p className="subtitle">{performanceData.title} - {performanceData.district}</p>
      <p className="overview">{performanceData.overview}</p>
      
      <div className="content">
        {stats && (
          <div className="stats-section">
            <h3>平台统计</h3>
            <div className="platform-stats">
              <div className="platform-stat">
                <div className="stat-value">{stats.total_studios}</div>
                <div className="stat-label">委员工作室总数</div>
              </div>
              <div className="platform-stat">
                <div className="stat-value">{stats.coverage}</div>
                <div className="stat-label">覆盖情况</div>
              </div>
              <div className="platform-stat">
                <div className="stat-value">{stats.star_ratings_2025.five_star}</div>
                <div className="stat-label">五星工作室</div>
              </div>
              <div className="platform-stat">
                <div className="stat-value">{stats.star_ratings_2025.four_star}</div>
                <div className="stat-label">四星工作室</div>
              </div>
            </div>
          </div>
        )}

        <div className="section">
          <h3>委员工作室列表</h3>
          <div className="studio-list">
            {studios.map(studio => (
              <div key={studio.id} className="studio-card">
                <div className="studio-header">
                  <span className="studio-id">{studio.id}</span>
                  <h4>{studio.name}</h4>
                </div>
                <div className="studio-body">
                  <p><strong>负责人:</strong> {studio.leader}</p>
                  <p><strong>地址:</strong> {studio.address}</p>
                  <div className="studio-rating">
                    <span className="rating-star">★</span>
                    <span className="rating-star">★</span>
                    <span className="rating-star">★</span>
                    <span className="rating-star">★</span>
                    <span className="rating-star">★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="note">共 {performanceData.studios.length} 个委员工作室，显示前10个</p>
        </div>

        <div className="section">
          <h3>履职平台特色</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>三位一体建设</h4>
              <p>强化委员工作室组织建设、制度建设、品牌建设</p>
            </div>
            <div className="feature-card">
              <h4>一室一品</h4>
              <p>打造各具特色的委员工作室品牌</p>
            </div>
            <div className="feature-card">
              <h4>品牌建设</h4>
              <p>深化"楼宇商圈""宋韵文化"和"全龄特有爱"公益慈善品牌</p>
            </div>
            <div className="feature-card">
              <h4>协商体系</h4>
              <p>构建宽领域、多层次、常态化的协商体系</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 新增页面组件
const FileBrowserPage = () => (
  <div className="page">
    <h1>文件浏览器</h1>
    <p>浏览和管理所有政协文件、图片和文档</p>
    
    <div className="content">
      <div className="section">
        <h3>完整文件系统</h3>
        <p>浏览数据目录中的所有文件，支持预览、检查和下载</p>
        <FileBrowser 
          showImages={true}
          showDocuments={true}
        />
      </div>

      <div className="section">
        <h3>文件类型说明</h3>
        <div className="file-types-info">
          <div className="type-info">
            <div className="type-icon" style={{ color: '#4caf50' }}>🖼️</div>
            <div className="type-details">
              <h4>图片文件</h4>
              <p>界别活动照片、工作场景图片等</p>
              <p>支持格式: .webp, .jpg, .png, .gif</p>
            </div>
          </div>
          <div className="type-info">
            <div className="type-icon" style={{ color: '#f44336' }}>📄</div>
            <div className="type-details">
              <h4>PDF文档</h4>
              <p>街道组织架构、评定表格等文档</p>
              <p>支持在线预览和下载</p>
            </div>
          </div>
          <div className="type-info">
            <div className="type-icon" style={{ color: '#2196f3' }}>📝</div>
            <div className="type-details">
              <h4>Word文档</h4>
              <p>工作报告、计划文档等</p>
              <p>支持文件信息查看</p>
            </div>
          </div>
          <div className="type-info">
            <div className="type-icon" style={{ color: '#388e3c' }}>📊</div>
            <div className="type-details">
              <h4>Excel表格</h4>
              <p>委员信息表、工作计划表等</p>
              <p>支持数据查看</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>使用说明</h3>
        <div className="usage-steps">
          <div className="usage-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>选择分类</h4>
              <p>在左侧选择文件分类，查看对应文件</p>
            </div>
          </div>
          <div className="usage-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>搜索过滤</h4>
              <p>使用搜索框和类型过滤快速找到文件</p>
            </div>
          </div>
          <div className="usage-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>预览检查</h4>
              <p>点击文件预览，使用"检查"按钮验证文件可读性</p>
            </div>
          </div>
          <div className="usage-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>问题反馈</h4>
              <p>遇到无法读取的文件时，系统会及时反馈错误信息</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PracticePage = () => (
  <div className="page">
    <h1>政协界别委员联系界别群众实践</h1>
    <p className="subtitle">南城发展专题 - 委员联系群众实践工作</p>
    
    <div className="content">
      <div className="section">
        <h3>实践工作重点</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>基层延伸覆盖</h4>
            <p>推动政协工作向基层延伸，实现委员联系群众全覆盖</p>
          </div>
          <div className="feature-card">
            <h4>机制创新</h4>
            <p>不建机构建机制，创新委员联系群众工作方式</p>
          </div>
          <div className="feature-card">
            <h4>南城发展</h4>
            <p>聚焦南城区域发展，开展专题调研和协商</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>工作内容</h3>
        <ul>
          <li>委员定期走访联系界别群众</li>
          <li>收集社情民意，反映群众诉求</li>
          <li>开展专题调研，形成调研报告</li>
          <li>组织协商议事，推动问题解决</li>
          <li>建立联系档案，跟踪工作成效</li>
          <li>开展政策宣讲，凝聚社会共识</li>
        </ul>
      </div>

      <div className="section">
        <h3>实践成果</h3>
        <div className="results">
          <div className="result-item">
            <h4>群众联系网络</h4>
            <p>建立完善的委员联系群众工作网络</p>
          </div>
          <div className="result-item">
            <h4>问题解决机制</h4>
            <p>形成有效的问题收集、反映、解决机制</p>
          </div>
          <div className="result-item">
            <h4>社会影响力</h4>
            <p>提升政协工作在基层的影响力</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StarRatingPage = () => (
  <div className="page">
    <h1>星级委员评定</h1>
    <p>委员履职星级评定与绩效管理</p>
    
    <div className="content">
      <div className="section">
        <h3>2025年度星级评定结果</h3>
        <div className="rating-stats">
          <div className="rating-card five-star">
            <div className="rating-title">五星委员工作室</div>
            <div className="rating-count">25个</div>
            <div className="rating-percent">50%</div>
          </div>
          <div className="rating-card four-star">
            <div className="rating-title">四星委员工作室</div>
            <div className="rating-count">17个</div>
            <div className="rating-percent">34%</div>
          </div>
          <div className="rating-card three-star">
            <div className="rating-title">三星委员工作室</div>
            <div className="rating-count">4个</div>
            <div className="rating-percent">8%</div>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>评定标准</h3>
        <ul>
          <li><strong>履职次数：</strong>年度履职活动参与情况</li>
          <li><strong>提案质量：</strong>提案数量、质量及采纳情况</li>
          <li><strong>群众联系：</strong>联系界别群众工作成效</li>
          <li><strong>协商成果：</strong>协商议事成果转化情况</li>
          <li><strong>社会影响：</strong>工作室品牌影响力</li>
          <li><strong>创新工作：</strong>工作方法创新与特色</li>
        </ul>
      </div>

      <div className="section">
        <h3>评定流程</h3>
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>自评申报</h4>
              <p>委员工作室提交年度工作总结</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>组织评审</h4>
              <p>政协组织专家进行评审</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>实地考察</h4>
              <p>对申报工作室进行实地考察</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>结果公示</h4>
              <p>公示评定结果，接受监督</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>评定表PDF文档</h3>
        <PDFViewer 
          filePath="6. 星级委员评定/评定表.pdf"
          title="委员履职星级评定表"
          description="委员履职星级评定标准、评分细则和评定表格"
        />
      </div>

      <div className="section">
        <h3>评定文件管理</h3>
        <FileBrowser 
          categoryId="star-rating"
          showImages={false}
          showDocuments={true}
        />
      </div>
    </div>
  </div>
);

const AnnualPlanPage = () => (
  <div className="page">
    <h1>2026年度履职计划</h1>
    <p>上城区政协2026年度工作计划与目标管理</p>
    
    <div className="content">
      <div className="section">
        <h3>年度工作目标</h3>
        <div className="goals">
          <div className="goal-card">
            <h4>履职全覆盖</h4>
            <p>实现委员工作室街道全覆盖</p>
          </div>
          <div className="goal-card">
            <h4>品牌建设</h4>
            <p>深化"一室一品"特色品牌建设</p>
          </div>
          <div className="goal-card">
            <h4>协商体系</h4>
            <p>构建常态化协商议事体系</p>
          </div>
          <div className="goal-card">
            <h4>群众联系</h4>
            <p>加强委员联系界别群众工作</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>重点工作计划</h3>
        <ul>
          <li><strong>第一季度：</strong>年度工作部署，委员培训</li>
          <li><strong>第二季度：</strong>专题调研，协商议事</li>
          <li><strong>第三季度：</strong>中期评估，工作推进</li>
          <li><strong>第四季度：</strong>年度总结，星级评定</li>
        </ul>
      </div>

      <div className="section">
        <h3>预期成果</h3>
        <div className="expected-results">
          <div className="result-item">
            <div className="result-icon">📈</div>
            <div className="result-text">委员工作室效能提升20%</div>
          </div>
          <div className="result-item">
            <div className="result-icon">🤝</div>
            <div className="result-text">群众满意度达到95%以上</div>
          </div>
          <div className="result-item">
            <div className="result-icon">🏆</div>
            <div className="result-text">新增5个特色品牌工作室</div>
          </div>
          <div className="result-item">
            <div className="result-icon">📊</div>
            <div className="result-text">提案采纳率提高15%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">上城区政协委员通</Link>
          </div>
          <ul className="nav-menu">
            <li><Link to="/">首页</Link></li>
            <li><Link to="/committee-home">委员之家</Link></li>
            <li><Link to="/street-committee">街道委员小组</Link></li>
            <li><Link to="/category-info">界别基本情况</Link></li>
            <li><Link to="/performance-platform">委员履职平台</Link></li>
            <li><Link to="/practice">联系群众实践</Link></li>
            <li><Link to="/star-rating">星级评定</Link></li>
            <li><Link to="/annual-plan">年度计划</Link></li>
            <li><Link to="/file-browser">文件浏览器</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/committee-home" element={<CommitteeHomePage />} />
            <Route path="/street-committee" element={<StreetCommitteePage />} />
            <Route path="/category-info" element={<CategoryInfoPage />} />
            <Route path="/performance-platform" element={<PerformancePlatformPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/star-rating" element={<StarRatingPage />} />
            <Route path="/annual-plan" element={<AnnualPlanPage />} />
            <Route path="/file-browser" element={<FileBrowserPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2026 上城区政协委员通系统 - 杭州市上城区政协信息管理平台</p>
          <p>地址：杭州市上城区 | 电话：0571-XXXXXXX | 邮箱：scqzx@hangzhou.gov.cn</p>
          <p className="footer-note">
            📁 系统支持图片浏览、PDF查看和文件管理 | 
            🔍 遇到无法读取的文件时会及时反馈
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;