// 文件扫描工具 - 扫描数据目录并创建文件映射

export interface FileInfo {
  path: string;
  name: string;
  fullPath: string;
  size: number;
  type: 'image' | 'pdf' | 'document' | 'excel' | 'json' | 'other';
  category: string;
  subcategory?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  files: FileInfo[];
  subcategories: Record<string, FileInfo[]>;
}

// 文件类型映射
const FILE_TYPES = {
  '.webp': 'image',
  '.jpg': 'image',
  '.jpeg': 'image',
  '.png': 'image',
  '.gif': 'image',
  '.pdf': 'pdf',
  '.docx': 'document',
  '.doc': 'document',
  '.xlsx': 'excel',
  '.xls': 'excel',
  '.json': 'json',
} as const;

// 目录映射（根据实际目录结构）
const CATEGORY_MAP = {
  '1. 委员之家': {
    id: 'committee-home',
    name: '委员之家',
    description: '委员基本信息与档案管理'
  },
  '2. 街道委员小组': {
    id: 'street-committee',
    name: '街道委员小组',
    description: '街道委员小组组织管理'
  },
  '3. 界别基本情况': {
    id: 'category-info',
    name: '界别基本情况',
    description: '政协界别信息与活动管理'
  },
  '4. 政协界别委员联系界别群众实践 - 南城发展': {
    id: 'practice',
    name: '联系群众实践',
    description: '委员联系界别群众实践工作'
  },
  '5. 委员履职平台': {
    id: 'performance-platform',
    name: '委员履职平台',
    description: '委员工作室履职记录与统计'
  },
  '6. 星级委员评定': {
    id: 'star-rating',
    name: '星级委员评定',
    description: '委员履职星级评定管理'
  },
  '7. 2026年度履职计划': {
    id: 'annual-plan',
    name: '2026年度履职计划',
    description: '年度工作计划与目标管理'
  }
};

// 界别子分类映射
const CATEGORY_SUBCATEGORIES = {
  '1中共': '中共界别',
  '2民革': '民革界别',
  '3民盟、民进': '民盟、民进界别',
  '4工会': '工会界别',
  '5妇联': '妇联界别',
  '6青联': '青联界别',
  '7科技、科协': '科技、科协界别',
  '8侨、台': '侨、台界别',
  '9新闻文体': '新闻文体界别',
  '10经济': '经济界别',
  '11环境资源和农业': '环境资源和农业界别',
  '12教育': '教育界别',
  '13医卫': '医卫界别',
  '14社会福利和保障': '社会福利和保障界别',
  '15民宗': '民宗界别',
  '16特邀': '特邀界别'
};

export class FileScanner {
  // 模拟扫描结果（实际项目中应该从服务器获取）
  static async scanDataDirectory(): Promise<CategoryInfo[]> {
    // 这里返回模拟数据，实际应该通过API获取
    return this.getMockScanResults();
  }

  static getMockScanResults(): CategoryInfo[] {
    return [
      {
        id: 'committee-home',
        name: '委员之家',
        description: '委员基本信息与档案管理',
        files: [
          {
            path: '1. 委员之家/1. 委员信息表.xlsx',
            name: '1. 委员信息表.xlsx',
            fullPath: 'D:/zhuomian/ddd/data/1. 委员之家/1. 委员信息表.xlsx',
            size: 102400,
            type: 'excel',
            category: '委员之家'
          },
          {
            path: '1. 委员之家/2. 街道委员小组委员信息表.xlsx',
            name: '2. 街道委员小组委员信息表.xlsx',
            fullPath: 'D:/zhuomian/ddd/data/1. 委员之家/2. 街道委员小组委员信息表.xlsx',
            size: 153600,
            type: 'excel',
            category: '委员之家'
          },
          {
            path: '1. 委员之家/3. 专委会组成委员信息表.xlsx',
            name: '3. 专委会组成委员信息表.xlsx',
            fullPath: 'D:/zhuomian/ddd/data/1. 委员之家/3. 专委会组成委员信息表.xlsx',
            size: 204800,
            type: 'excel',
            category: '委员之家'
          }
        ],
        subcategories: {}
      },
      {
        id: 'street-committee',
        name: '街道委员小组',
        description: '街道委员小组组织管理',
        files: [
          {
            path: '2. 街道委员小组/14街道.pdf',
            name: '14街道.pdf',
            fullPath: 'D:/zhuomian/ddd/data/2. 街道委员小组/14街道.pdf',
            size: 38321100,
            type: 'pdf',
            category: '街道委员小组'
          }
        ],
        subcategories: {}
      },
      {
        id: 'category-info',
        name: '界别基本情况',
        description: '政协界别信息与活动管理',
        files: [
          {
            path: '3. 界别基本情况/1.界别基本情况.docx',
            name: '1.界别基本情况.docx',
            fullPath: 'D:/zhuomian/ddd/data/3. 界别基本情况/1.界别基本情况.docx',
            size: 24207,
            type: 'document',
            category: '界别基本情况'
          }
        ],
        subcategories: {
          '中共界别': [
            {
              path: '3. 界别基本情况/活动照片/1中共/2022.12.06 中共界别委员活动.webp',
              name: '2022.12.06 中共界别委员活动.webp',
              fullPath: 'D:/zhuomian/ddd/data/3. 界别基本情况/活动照片/1中共/2022.12.06 中共界别委员活动.webp',
              size: 512000,
              type: 'image',
              category: '界别基本情况',
              subcategory: '中共界别'
            }
          ],
          '经济界别': [
            {
              path: '3. 界别基本情况/活动照片/10经济/353cd94f8a4dc02a2e821a5ba8ab043.webp',
              name: '353cd94f8a4dc02a2e821a5ba8ab043.webp',
              fullPath: 'D:/zhuomian/ddd/data/3. 界别基本情况/活动照片/10经济/353cd94f8a4dc02a2e821a5ba8ab043.webp',
              size: 256000,
              type: 'image',
              category: '界别基本情况',
              subcategory: '经济界别'
            }
          ]
        }
      },
      {
        id: 'performance-platform',
        name: '委员履职平台',
        description: '委员工作室履职记录与统计',
        files: [
          {
            path: '5. 委员履职平台/5履职平台.json',
            name: '5履职平台.json',
            fullPath: 'D:/zhuomian/ddd/data/5. 委员履职平台/5履职平台.json',
            size: 779,
            type: 'json',
            category: '委员履职平台'
          },
          {
            path: '5. 委员履职平台/1.2026上城区政协委员工作室名单(按街道顺序).xlsx',
            name: '1.2026上城区政协委员工作室名单(按街道顺序).xlsx',
            fullPath: 'D:/zhuomian/ddd/data/5. 委员履职平台/1.2026上城区政协委员工作室名单(按街道顺序).xlsx',
            size: 243,
            type: 'excel',
            category: '委员履职平台'
          }
        ],
        subcategories: {}
      },
      {
        id: 'star-rating',
        name: '星级委员评定',
        description: '委员履职星级评定管理',
        files: [
          {
            path: '6. 星级委员评定/评定表.pdf',
            name: '评定表.pdf',
            fullPath: 'D:/zhuomian/ddd/data/6. 星级委员评定/评定表.pdf',
            size: 1024000,
            type: 'pdf',
            category: '星级委员评定'
          }
        ],
        subcategories: {}
      },
      {
        id: 'annual-plan',
        name: '2026年度履职计划',
        description: '年度工作计划与目标管理',
        files: [
          {
            path: '7. 2026年度履职计划/2026年度履职计划.xlsx',
            name: '2026年度履职计划.xlsx',
            fullPath: 'D:/zhuomian/ddd/data/7. 2026年度履职计划/2026年度履职计划.xlsx',
            size: 512000,
            type: 'excel',
            category: '2026年度履职计划'
          },
          {
            path: '7. 2026年度履职计划/2026年街道"请你来协商"活动计划.xls',
            name: '2026年街道"请你来协商"活动计划.xls',
            fullPath: 'D:/zhuomian/ddd/data/7. 2026年度履职计划/2026年街道"请你来协商"活动计划.xls',
            size: 256000,
            type: 'excel',
            category: '2026年度履职计划'
          }
        ],
        subcategories: {}
      }
    ];
  }

  // 获取文件类型
  static getFileType(filename: string): FileInfo['type'] {
    const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
    return FILE_TYPES[ext as keyof typeof FILE_TYPES] || 'other';
  }

  // 获取文件图标
  static getFileIcon(fileType: FileInfo['type']): string {
    const icons = {
      'image': '🖼️',
      'pdf': '📄',
      'document': '📝',
      'excel': '📊',
      'json': '📋',
      'other': '📎'
    };
    return icons[fileType];
  }

  // 格式化文件大小
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // 获取文件类型标签
  static getFileTypeLabel(type: FileInfo['type']): string {
    const labels = {
      'image': '图片',
      'pdf': 'PDF文档',
      'document': 'Word文档',
      'excel': 'Excel表格',
      'json': 'JSON数据',
      'other': '其他文件'
    };
    return labels[type];
  }

  // 检查文件是否可读
  static async checkFileReadable(filePath: string): Promise<{
    readable: boolean;
    error?: string;
    size?: number;
  }> {
    try {
      // 这里应该实现实际的文件检查逻辑
      // 暂时返回模拟数据
      return {
        readable: true,
        size: 1024
      };
    } catch (error: any) {
      return {
        readable: false,
        error: error.message || '无法读取文件'
      };
    }
  }
}