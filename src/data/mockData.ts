import { CommitteeMember, StreetCommitteeGroup, Category, PerformanceRecord } from './types';

// 模拟委员数据
export const mockCommitteeMembers: CommitteeMember[] = [
  {
    id: '1',
    name: '张三',
    gender: '男',
    birthDate: '1975-03-15',
    politicalStatus: '中共党员',
    education: '博士',
    workUnit: '北京大学',
    position: '教授',
    phone: '13800138001',
    email: 'zhangsan@pku.edu.cn',
    address: '北京市海淀区',
    joinDate: '2018-01-01',
    category: '教育界',
    streetGroup: '海淀街道委员小组'
  },
  {
    id: '2',
    name: '李四',
    gender: '女',
    birthDate: '1980-08-22',
    politicalStatus: '民盟盟员',
    education: '硕士',
    workUnit: '清华大学',
    position: '副教授',
    phone: '13800138002',
    email: 'lisi@tsinghua.edu.cn',
    address: '北京市海淀区',
    joinDate: '2019-03-15',
    category: '教育界',
    streetGroup: '海淀街道委员小组'
  },
  {
    id: '3',
    name: '王五',
    gender: '男',
    birthDate: '1970-12-10',
    politicalStatus: '无党派人士',
    education: '本科',
    workUnit: '华为技术有限公司',
    position: '高级工程师',
    phone: '13800138003',
    email: 'wangwu@huawei.com',
    address: '北京市朝阳区',
    joinDate: '2017-06-20',
    category: '经济界',
    streetGroup: '朝阳街道委员小组'
  }
];

// 模拟街道委员小组数据
export const mockStreetGroups: StreetCommitteeGroup[] = [
  {
    id: '1',
    name: '海淀街道委员小组',
    street: '海淀街道',
    leader: '张三',
    memberCount: 15,
    address: '海淀街道办事处',
    phone: '010-88888888',
    activities: [
      {
        id: '1',
        title: '社区调研活动',
        date: '2026-04-15',
        location: '海淀社区',
        participants: ['张三', '李四', '王五'],
        description: '调研社区基础设施建设情况',
        photos: []
      }
    ]
  },
  {
    id: '2',
    name: '朝阳街道委员小组',
    street: '朝阳街道',
    leader: '王五',
    memberCount: 12,
    address: '朝阳街道办事处',
    phone: '010-99999999',
    activities: [
      {
        id: '2',
        title: '企业走访',
        date: '2026-04-10',
        location: '朝阳科技园',
        participants: ['王五', '赵六'],
        description: '走访高新技术企业',
        photos: []
      }
    ]
  }
];

// 模拟界别数据
export const mockCategories: Category[] = [
  {
    id: '1',
    name: '教育界',
    code: 'EDU',
    description: '教育系统政协委员',
    memberCount: 25,
    leader: '张三',
    photos: []
  },
  {
    id: '2',
    name: '经济界',
    code: 'ECO',
    description: '经济领域政协委员',
    memberCount: 30,
    leader: '王五',
    photos: []
  },
  {
    id: '3',
    name: '医卫界',
    code: 'MED',
    description: '医疗卫生系统政协委员',
    memberCount: 20,
    leader: '赵六',
    photos: []
  }
];

// 模拟履职记录数据
export const mockPerformanceRecords: PerformanceRecord[] = [
  {
    id: '1',
    memberId: '1',
    memberName: '张三',
    type: '提案',
    title: '关于加强校园安全建设的提案',
    content: '建议加强校园安全设施建设，提高师生安全意识',
    date: '2026-03-15',
    status: '已完成',
    score: 95,
    attachments: []
  },
  {
    id: '2',
    memberId: '2',
    memberName: '李四',
    type: '会议',
    title: '参加政协常委会',
    content: '参加政协常委会，讨论年度工作计划',
    date: '2026-04-01',
    status: '已完成',
    score: 90,
    attachments: []
  },
  {
    id: '3',
    memberId: '3',
    memberName: '王五',
    type: '调研',
    title: '高新技术产业发展调研',
    content: '调研高新技术产业发展现状和问题',
    date: '2026-04-10',
    status: '进行中',
    score: 85,
    attachments: []
  }
];

// 数据服务函数
export const dataService = {
  // 获取所有委员
  getCommitteeMembers: () => Promise.resolve(mockCommitteeMembers),
  
  // 获取所有街道小组
  getStreetGroups: () => Promise.resolve(mockStreetGroups),
  
  // 获取所有界别
  getCategories: () => Promise.resolve(mockCategories),
  
  // 获取所有履职记录
  getPerformanceRecords: () => Promise.resolve(mockPerformanceRecords),
  
  // 根据ID获取委员
  getCommitteeMemberById: (id: string) => 
    Promise.resolve(mockCommitteeMembers.find(member => member.id === id)),
  
  // 根据ID获取街道小组
  getStreetGroupById: (id: string) => 
    Promise.resolve(mockStreetGroups.find(group => group.id === id)),
  
  // 根据ID获取界别
  getCategoryById: (id: string) => 
    Promise.resolve(mockCategories.find(category => category.id === id)),
  
  // 根据ID获取履职记录
  getPerformanceRecordById: (id: string) => 
    Promise.resolve(mockPerformanceRecords.find(record => record.id === id))
};