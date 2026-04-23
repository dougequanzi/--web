// 数据类型定义

export interface CommitteeMember {
  id: string;
  name: string;
  gender: '男' | '女';
  birthDate: string;
  politicalStatus: string;
  education: string;
  workUnit: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  joinDate: string;
  category: string;
  streetGroup: string;
}

export interface StreetCommitteeGroup {
  id: string;
  name: string;
  street: string;
  leader: string;
  memberCount: number;
  address: string;
  phone: string;
  activities: Activity[];
}

export interface Category {
  id: string;
  name: string;
  code: string;
  description: string;
  memberCount: number;
  leader: string;
  photos: string[];
}

export interface PerformanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  type: '提案' | '会议' | '调研' | '其他';
  title: string;
  content: string;
  date: string;
  status: '进行中' | '已完成' | '已归档';
  score: number;
  attachments: string[];
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  location: string;
  participants: string[];
  description: string;
  photos: string[];
}