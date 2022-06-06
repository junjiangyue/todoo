// 日期，ISO字符串(0时区)，去掉'T'以后的部分
const yesterdayStr = new Date((new Date()).getTime() - 24 * 60 * 60 * 1000).toISOString().replace(/T.*$/, '')

const todayStr = new Date().toISOString().replace(/T.*$/, '')

const tommorrowStr = new Date((new Date()).getTime() + 24 * 60 * 60 * 1000).toISOString().replace(/T.*$/, '')

let counter = 0

// 数据库返回的事件mock
const mockEvents = [
  {
    id: String(counter++),
    title: '已完成事件',
    description: '描述',
    date: yesterdayStr,
    priority: '重要不紧急',
    state: '已完成',
    tagName: '标签',
    repetition: '重复频率',
    scope: '重复范围'
  },
  {
    id: String(counter++),
    title: '重要不紧急长事件',
    description: '描述',
    startTime: yesterdayStr,
    endTime: tommorrowStr,
    priority: '重要不紧急',
    state: '未完成',
    tagName: '标签',
    repetition: '重复频率',
    scope: '重复范围'
  },  
  {
    id: String(counter++),
    title: '重要不紧急长事件',
    start: yesterdayStr,
    end: tommorrowStr,
    color: '#0065C1'    
  },
  {
    id: String(counter++),
    title: '已完成',
    start: yesterdayStr,
    color: '#007505'
  },
  {
    id: String(counter++),
    title: '定时不紧急不重要',
    start: todayStr + 'T12:00:00',
    color: '#E6EFFF'
  },
  {
    id: String(counter++),
    title: '全天紧急不重要',
    start: tommorrowStr,
    color: '#E5C100'
  },
  {
    id: String(counter++),
    title: '全天重要不紧急',
    start: tommorrowStr,
    color: '#0065C1'
  },
  {
    id: String(counter++),
    title: '全天重要紧急',
    start: tommorrowStr,
    color: '#B20000'
  },
]