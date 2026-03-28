import React, { useState } from 'react';
import { MapPin, Clock, Train, Utensils, Hotel, Camera, Map as MapIcon, Smile } from 'lucide-react';

// 定義行程資料結構
type EventType = 'transport' | 'food' | 'hotel' | 'activity';

interface ItineraryEvent {
  id: string;
  time: string;
  type: EventType;
  title: string;
  desc: string;
  location?: string;
  // herehere 📸 圖片設定區：在這裡加入一個可選的 images 陣列
  images?: string[]; 
}

interface DayPlan {
  id: number;
  day: string;
  date: string;
  title: string;
  quote: string; // 每天專屬的可愛對話氣泡內容
  colorTheme: 'pink' | 'blue' | 'orange' | 'emerald' | 'purple';
  events: ItineraryEvent[];
}

// 配合可愛風格重新定義馬卡龍色系
const themeClasses = {
  pink: { cardBg: 'bg-[#FFE4E8]', pillBg: 'bg-[#FF7EA5]', textMain: 'text-[#2D2D42]', dot: 'bg-[#FF7EA5]' },
  blue: { cardBg: 'bg-[#EBF5FF]', pillBg: 'bg-[#60A5FA]', textMain: 'text-[#2D2D42]', dot: 'bg-[#60A5FA]' },
  orange: { cardBg: 'bg-[#FFF0E6]', pillBg: 'bg-[#FB923C]', textMain: 'text-[#2D2D42]', dot: 'bg-[#FB923C]' },
  emerald: { cardBg: 'bg-[#E8FBF0]', pillBg: 'bg-[#34D399]', textMain: 'text-[#2D2D42]', dot: 'bg-[#34D399]' },
  purple: { cardBg: 'bg-[#F3E8FF]', pillBg: 'bg-[#A78BFA]', textMain: 'text-[#2D2D42]', dot: 'bg-[#A78BFA]' },
};

const itineraryData: DayPlan[] = [
  {
    id: 1,
    day: 'DAY 1',
    date: '3/4',
    title: '抵達汕頭 &\n小公園漫步',
    quote: '耶！終於到汕頭啦！快去吃牛肉火鍋吧！',
    colorTheme: 'pink',
    events: [
      { 
        id: '1-1', 
        time: '10:30', 
        type: 'transport', 
        title: '深圳羅湖出發', 
        desc: '搭乘 G6476 車次，預計 12:09 到達汕頭站',
      },
      { 
        id: '1-2', 
        time: '12:09', 
        type: 'transport', 
        title: '到達汕頭站', 
        desc: '一出站就手刀打車，直奔美味餐廳！🚕💨',
      },
      { 
        id: '1-3', 
        time: '13:00', 
        type: 'food', 
        title: '午餐：偉記牛肉', 
        desc: '金鴻公路店享受正宗牛肉火鍋', 
        location: '偉記牛肉(金鴻公路店)',
      },
      { 
        id: '1-4', 
        time: '14:00', 
        type: 'hotel', 
        title: '酒店 Check-in', 
        desc: '辦理入住，放下行李整理休息', 
        location: '米格美居(萬象城龍眼南路店)',
      },
      { 
        id: '1-5', 
        time: '下午', 
        type: 'activity', 
        title: '汕頭小公園行街', 
        desc: '體驗老城區風情與歷史建築',
      },
      { 
        id: '1-6', 
        time: '18:00', 
        type: 'food', 
        title: '晚餐：萬隆砂鍋粥', 
        desc: '可預先網上取票，餐後回酒店休息', 
        location: '非遺·萬隆即煮砂鍋粥',
      }
    ]
  },
  {
    id: 2,
    day: 'DAY 2',
    date: '4/4',
    title: '南澳島出發 &\n海島風情',
    quote: '出發南澳島！海風與海鮮我來啦～🌊',
    colorTheme: 'orange',
    events: [
      { 
        id: '2-1', 
        time: '07:00', 
        type: 'food', 
        title: '早餐：伊早豆漿', 
        desc: '外賣點餐，充滿活力的早晨', 
        location: '伊早豆漿(金園店)',
      },
      { 
        id: '2-2', 
        time: '09:00', 
        type: 'transport', 
        title: '前往南澳島', 
        desc: '上車搭車出發前往美麗的南澳島',
      },
      { 
        id: '2-3', 
        time: '12:00', 
        type: 'food', 
        title: '午餐：胖哥有炸', 
        desc: '品嚐新鮮海鮮與特色小炒', 
        location: '胖哥有炸·海鮮小炒',
      },
      { 
        id: '2-4', 
        time: '16:00', 
        type: 'transport', 
        title: '離開南澳島', 
        desc: '結束島上行程，乘車返回市區',
      },
      { 
        id: '2-5', 
        time: '18:30', 
        type: 'food', 
        title: '晚餐：潮鹵道火鍋', 
        desc: '享用特色鹵水火鍋，餐後回酒店休息', 
        location: '潮鹵道非遺鹵水火鍋(總店)',
      }
    ]
  },
  {
    id: 3,
    day: 'DAY 3',
    date: '5/4',
    title: '潮州古城 &\n文化尋味之旅',
    quote: '潮州古城好味道！鹵鵝等我！🤤',
    colorTheme: 'emerald',
    events: [
      { 
        id: '3-1', 
        time: '08:00', 
        type: 'food', 
        title: '早餐：小吳腸粉', 
        desc: '外賣點餐，必吃特色腸粉',
      },
      { 
        id: '3-2', 
        time: '10:30', 
        type: 'transport', 
        title: '前往潮州古城', 
        desc: '打車前往潮州市區',
      },
      { 
        id: '3-3', 
        time: '12:00', 
        type: 'food', 
        title: '午餐：潮鎮老尾牛雜', 
        desc: '古城內的在地美味', 
        location: '潮鎮老尾牛雜(環城西路店)',
      },
      { 
        id: '3-4', 
        time: '下午', 
        type: 'activity', 
        title: '古城行街', 
        desc: '漫步潮州古城，感受歷史底蘊',
      },
      { 
        id: '3-5', 
        time: '17:30', 
        type: 'food', 
        title: '晚餐：劉卜鹵鵝', 
        desc: '品嚐全國首店的道地鹵鵝', 
        location: '劉卜鹵鵝(全國首店)',
      },
      { 
        id: '3-6', 
        time: '21:00', 
        type: 'transport', 
        title: '返回汕頭', 
        desc: '打車回汕頭酒店休息',
      }
    ]
  },
  {
    id: 4,
    day: 'DAY 4',
    date: '6/4',
    title: '市區血拼 &\n採買手信',
    quote: '大採買時間！超彈牙肉丸買起來～🛍️',
    colorTheme: 'purple',
    events: [
      { 
        id: '4-1', 
        time: '08:00', 
        type: 'food', 
        title: '早餐：海記豬血湯', 
        desc: '在地人的暖胃早餐', 
        location: '海記豬血湯(龍眼園店)',
      },
      { 
        id: '4-2', 
        time: '10:37', 
        type: 'transport', 
        title: '長輩回深圳', 
        desc: '7叔7嬸搭乘 D7106 車次 (10:37 - 13:21)',
      },
      { 
        id: '4-3', 
        time: '白天', 
        type: 'activity', 
        title: '市區逛街採買', 
        desc: '其他人至龍眼南路、萬象城、潤街逛街', 
        location: '萬象城周邊',
      },
      { 
        id: '4-4', 
        time: '下午', 
        type: 'activity', 
        title: '買手信：沈振興丸店', 
        desc: '購買著名的潮汕肉丸帶回家', 
        location: '沈振興丸店',
      },
      { 
        id: '4-5', 
        time: '晚上', 
        type: 'food', 
        title: '晚餐：添旺牛店', 
        desc: '潮汕鮮烤牛肉完美收尾', 
        location: '添旺牛店·潮汕鮮烤牛肉(高鐵站店)',
      }
    ]
  },
  {
    id: 5,
    day: 'DAY 5',
    date: '7/4',
    title: '完美結尾 &\n滿載而歸',
    quote: '吃完粿汁就要回家囉！下次再來！👋',
    colorTheme: 'blue',
    events: [
      { 
        id: '5-1', 
        time: '早上', 
        type: 'food', 
        title: '早餐：良心腸粉', 
        desc: '離開前的最後一頓在地美食', 
        location: '良心腸粉·粿汁(萬象城店)',
      },
      { 
        id: '5-2', 
        time: '10:00', 
        type: 'hotel', 
        title: '酒店 Check out', 
        desc: '辦理退房並打車到汕頭站',
      },
      { 
        id: '5-3', 
        time: '11:03', 
        type: 'transport', 
        title: '搭高鐵回深', 
        desc: '搭乘 D7414 車次，13:39 抵達深圳北站',
      }
    ]
  }
];

// Helper 元件：圖示
const EventIcon = ({ type, colorClass }: { type: EventType, colorClass: string }) => {
  switch (type) {
    case 'transport': return <Train className={`w-9 h-9 ${colorClass}`} />;
    case 'food': return <Utensils className={`w-9 h-9 ${colorClass}`} />;
    case 'hotel': return <Hotel className={`w-9 h-9 ${colorClass}`} />;
    case 'activity': return <Camera className={`w-9 h-9 ${colorClass}`} />;
    default: return <MapIcon className={`w-9 h-9 ${colorClass}`} />;
  }
};

export default function App() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeData = itineraryData[activeTabIndex];
  const theme = themeClasses[activeData.colorTheme];

  return (
    <div className="min-h-screen bg-[#FFF8F9] font-sans pb-20 selection:bg-pink-300 selection:text-white relative overflow-hidden">
      
      {/* --- 背景可愛漂浮裝飾 --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* 月亮：緩慢搖擺 */}
        <div className="absolute top-16 right-8 sm:right-16 animate-float-slow">
          <svg className="w-14 h-14 text-[#FFD100] opacity-80 transform -rotate-12 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </div>
        
        {/* 動態閃電 1：中速搖擺 + 閃爍 */}
        <div className="absolute top-48 left-8 animate-float-medium">
          <svg className="w-10 h-10 text-[#FFD100] animate-lightning transform -rotate-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>

        {/* 動態閃電 2：快速搖擺 + 延遲閃爍 */}
        <div className="absolute top-[35rem] right-12 animate-float-fast">
          <svg className="w-12 h-12 text-[#FFD100] animate-lightning-delayed transform rotate-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>

        {/* 星星：快速搖擺 */}
        <div className="absolute top-12 left-6 animate-float-fast">
          <svg className="w-8 h-8 text-[#FFC1D3] transform -rotate-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
        </div>

        {/* 愛心：緩慢搖擺 */}
        <div className="absolute top-24 right-8 animate-float-slow">
          <svg className="w-10 h-10 text-[#A7F3D0] opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>

        {/* 雲朵：中速搖擺 */}
        <div className="absolute top-[28rem] left-4 animate-float-medium">
          <svg className="w-12 h-12 text-[#E0E7FF]" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>
        </div>

        {/* 笑臉：緩慢搖擺 */}
        <div className="absolute top-64 -left-4 animate-float-slow">
          <div className="w-16 h-16 rounded-full border-[3px] border-[#4A5568] flex items-center justify-center bg-[#FFF8F9] opacity-80">
            <Smile className="w-10 h-10 text-[#4A5568]" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* --- 頂部 Header --- */}
      <header className="pt-6 pb-4 px-5 flex justify-between items-center z-20 relative max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-[#FFE4E8] p-2.5 rounded-full shadow-sm">
            <Camera className="text-[#FF4D82] w-6 h-6" strokeWidth={2.5} />
          </div>
          <h1 className="text-[1.35rem] font-black text-[#2D2D42] tracking-wider flex items-center gap-2">
            潮汕遊記
            <span className="bg-[#FFD100] text-black text-xs px-2.5 py-1 rounded-full font-black transform -rotate-3 shadow-sm">
              2026
            </span>
          </h1>
        </div>
        <div className="bg-white px-3 py-2 rounded-full shadow-sm flex items-center gap-1.5 border-[2px] border-[#FFF0F3] text-[#FF4D82] font-black text-xs tracking-wider">
          <MapPin className="w-4 h-4" strokeWidth={3} /> SHANTOU
        </div>
      </header>

      <main className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* --- 大橫幅英雄卡片 (Hero Card) --- */}
        <div className={`w-[92%] ${theme.cardBg} border-[6px] border-white rounded-[2.5rem] p-8 shadow-sm relative mt-2 transition-colors duration-500 flex flex-col items-center text-center`}>
           <svg className="absolute top-4 right-4 w-32 h-32 text-white opacity-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
           
           <div className="flex justify-center gap-3 mb-6 relative z-10">
              <span className={`${theme.pillBg} text-white px-5 py-2 rounded-full font-black text-xl shadow-sm transition-colors duration-500`}>
                {activeData.day}
              </span>
              <span className="bg-white text-[#64748B] px-5 py-2 rounded-full font-bold text-xl shadow-sm">
                {activeData.date}
              </span>
           </div>
           
           <h2 className="text-[2.5rem] sm:text-[2.8rem] leading-[1.3] font-black text-[#2D2D42] mb-6 whitespace-pre-line relative z-10">
             {activeData.title}
           </h2>
           
           <div className="inline-flex items-center justify-center gap-2 bg-white/70 px-5 py-2.5 rounded-full font-black text-[#475569] text-base tracking-wide relative z-10 shadow-sm">
             <Clock className="text-[#FF4D82] w-6 h-6" strokeWidth={2.5} /> {activeData.events.length} STOPS TODAY!
           </div>

           {/* 對話氣泡 */}
           <div className="absolute -bottom-8 -right-2 sm:-right-6 bg-white p-5 rounded-[1.5rem] shadow-lg border-2 border-[#FFE4E8] w-[200px] sm:w-[240px] z-20 animate-fade-in-up text-left">
             <div className="text-[16px] sm:text-[18px] font-black text-[#334155] leading-snug">
               {activeData.quote}
             </div>
             {/* 氣泡小尾巴 */}
             <div className="absolute -bottom-2 right-12 w-5 h-5 bg-white transform rotate-45 border-b-2 border-r-2 border-[#FFE4E8]"></div>
           </div>
        </div>

        {/* --- 膠囊型日期導覽列 (Tab Bar) --- */}
        <div className="w-[92%] mt-10 mb-6 bg-white rounded-[3rem] shadow-md border-2 border-[#F8FAFC] p-1.5 flex justify-between items-center relative z-20">
          {itineraryData.map((tab, index) => {
            const isActive = activeTabIndex === index;
            const currentTheme = themeClasses[tab.colorTheme];
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabIndex(index)}
                className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-full transition-all duration-300 relative ${
                  isActive ? currentTheme.cardBg : 'bg-transparent hover:bg-gray-50'
                }`}
              >
                <span className={`font-black text-lg sm:text-xl leading-none mb-1 ${isActive ? 'text-[#2D2D42]' : 'text-[#CBD5E1]'}`}>
                  {tab.date}
                </span>
                <span className={`font-bold text-[10px] sm:text-xs tracking-wider ${isActive ? 'text-[#2D2D42]' : 'text-[#CBD5E1]'}`}>
                  {tab.day}
                </span>
                {/* 底部小圓點 */}
                {isActive && (
                  <div className={`absolute -bottom-2.5 w-1.5 h-1.5 rounded-full ${currentTheme.dot}`}></div>
                )}
              </button>
            );
          })}
        </div>

        {/* --- 時間軸列表 --- */}
        <div className="w-full px-4 mt-4 space-y-8">
          {activeData.events.map((event, index) => (
            <div 
              key={event.id} 
              className="flex gap-4 animate-fade-in-up w-full" 
              style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
            >
              {/* 左側時間與連接線 */}
              <div className="flex flex-col items-center w-16 flex-shrink-0 mt-3">
                <span className="text-xl font-black text-[#94A3B8] text-center leading-tight">
                  {event.time.replace(' ', '\n')}
                </span>
                {index !== activeData.events.length - 1 && (
                  <div className={`w-2 h-full ${theme.cardBg} my-4 rounded-full transition-colors duration-500`}></div>
                )}
              </div>

              {/* 右側資訊卡片 */}
              <div className={`flex-1 bg-white p-7 rounded-[2.5rem] shadow-sm border-[3px] border-[#F1F5F9] hover:border-[#FFE4E8] transition-all relative overflow-hidden group`}>
                <div className="flex items-start gap-5 relative z-10">
                  <div className={`p-4 rounded-[1.5rem] ${theme.cardBg} mt-0.5 transition-colors duration-500`}>
                    <EventIcon type={event.type} colorClass={theme.textMain} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-[#1E293B] text-2xl mb-3">{event.title}</h3>
                    <p className="text-[#64748B] text-xl leading-relaxed mb-5 font-bold">{event.desc}</p>
                    
                    {event.location && (
                      <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ${theme.cardBg} text-[#475569] text-lg font-black transition-colors duration-500`}>
                        <MapPin className="w-6 h-6 text-[#FF4D82]" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* 圖片顯示區域 */}
                <div className="mt-6 w-full relative z-10">
                  <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 scrollbar-hide pb-2">
                    
                    {event.images && event.images.length > 0 ? (
                      event.images.map((imgSrc, imgIdx) => (
                        <div key={imgIdx} className={`w-full flex-shrink-0 snap-center aspect-[4/3] rounded-[1.5rem] border-[4px] border-white shadow-sm overflow-hidden relative`}>
                          <img src={imgSrc} alt={`${event.title} 照片 ${imgIdx + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full border border-white/50 bg-black/40 text-white text-sm font-bold backdrop-blur-sm whitespace-nowrap">
                            ⟵ 左右滑動瀏覽 ⟶
                          </div>
                        </div>
                      ))
                    ) : (
                      [1, 2, 3].map((imgIdx) => (
                        <div 
                          key={imgIdx} 
                          className={`w-full flex-shrink-0 snap-center aspect-[4/3] rounded-[1.5rem] ${theme.cardBg} border-[4px] border-white shadow-sm flex flex-col items-center justify-center gap-2 overflow-hidden relative img-placeholder-group`}
                        >
                          <Camera className={`w-12 h-12 ${theme.textMain} opacity-30`} strokeWidth={2.5} />
                          <span className={`text-lg font-black ${theme.textMain} opacity-30`}>預留照片區 {imgIdx} / 3</span>
                          <span className={`text-sm font-bold ${theme.textMain} opacity-40`}>
                            (請至程式碼上方加入 images 屬性)
                          </span>
                          <div className={`px-3 py-1 mt-2 rounded-full border-2 border-white/40 text-sm font-bold ${theme.textMain} opacity-40 flex items-center gap-2`}>
                            ⟵ 左右滑動瀏覽 ⟶
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- 右下角懸浮大笑臉按鈕 --- */}
      <button className="fixed bottom-6 right-4 md:right-auto md:ml-[600px] w-16 h-16 bg-[#FF4D82] rounded-full shadow-lg border-[4px] border-white flex items-center justify-center z-50 hover:scale-110 transition-transform active:scale-95">
        <Smile className="text-white w-9 h-9" strokeWidth={2.5} />
      </button>

      {/* 注入自訂動畫 CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        /* 閃電發光動畫 */
        @keyframes flash {
          0%, 85%, 100% { opacity: 0; transform: scale(1); }
          88%, 94% { opacity: 1; transform: scale(1.1); filter: drop-shadow(0 0 8px rgba(255,209,0,0.6)); }
          91% { opacity: 0.3; }
        }
        .animate-lightning {
          animation: flash 4s infinite;
        }
        .animate-lightning-delayed {
          animation: flash 5s infinite 2.5s;
        }

        /* 上下左右漂浮搖擺動畫 (3種不同軌跡) */
        @keyframes float-1 {
          0%, 100% { transform: translate(0px, 0px); }
          33% { transform: translate(15px, -10px); }
          66% { transform: translate(-10px, 15px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0px, 0px); }
          33% { transform: translate(-15px, 15px); }
          66% { transform: translate(10px, -15px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0px, 0px); }
          33% { transform: translate(10px, 20px); }
          66% { transform: translate(-15px, -10px); }
        }
        
        .animate-float-slow { animation: float-1 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-2 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-3 5s infinite; }
      `}} />
    </div>
  );
}
