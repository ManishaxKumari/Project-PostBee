// import { ActivityIcon, CheckCircleIcon, ClockIcon, SendIcon, Share2Icon, TrendingUpIcon } from "lucide-react"
// import { useEffect, useState } from "react"
// import api from "../api/axios"



// const Dashboard = () => {

//   const [stats, setStats] = useState({scheduled: 0, published: 0, connectedAccounts: 0})
//   const [activities, setActivities] = useState<any[]>([])

//   useEffect(()=>{
//     const fetchDashboardData = async () => {
//       try {
//         const [postsRes, accountsRes, activityRes] = await Promise.all([api.get("/api/posts"), api.get("/api/accounts"), api.get("/api/activity")])

//         const posts = postsRes.data;
//         setStats({
//           scheduled: posts.filter((p: any) => p.status === 'scheduled').length,
//           published: posts.filter((p: any) => p.status === 'published').length,
//           connectedAccounts: accountsRes.data.filter((a: any) => a.status === 'connected').length,
//         })
//         setActivities(activityRes.data)
//       } catch (error: any) {
//         console.error("Error fetching dashboard data", error)
//       }
//     };
//     fetchDashboardData();
//   },[])

//   const statCards = [
//     {
//       label: "Scheduled Posts",
//       value: stats.scheduled,
//       icon: ClockIcon,
//       trend: "+2 today",
//     },
//     {
//       label: "Published Posts",
//       value: stats.published,
//       icon: CheckCircleIcon,
//       trend: "All time",
//     },
//     {
//       label: "Connected Accounts",
//       value: stats.connectedAccounts,
//       icon: Share2Icon,
//       trend: "Active",
//     },
//   ]

//   return (
//     <div className="space-y-8">
//             {/* Full-width banner */}
//       <div className="w-full ">
//         <img
//           src="./src/assets/banner.png"
//           alt="postbee"
//           className="w-full h-100 md:h-130 object-cover rounded-2xl"
//         />
//       </div>

//       {/* Welcome bar */}
//       <div>
//         <h2 className="text-2xl text-slate-900">Welcome back! 👋</h2>
//         <p className="text-slate-500 text-sm mt-0.5">Here's what's happening with your social accounts today.</p>
//       </div>

//       {/* Stat cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//         {statCards.map((card)=>(
//           <div key={card.label} className="bg-white hover:bg-amber-50 relative border border-slate-200 rounded-2xl p-5 hover:border-amber-200 transition-all">
//             <div className="flex items-center justify-between mb-4">

//               <div className="text-3xl font-medium text-slate-800 tabular-nums">{card.value}</div>

//               <div className="text-xs absolute right-4 top-4 text-yellow-600 flex items-center gap-1">
//                 <TrendingUpIcon className="size-3"/>
//                 {card.trend}
//               </div>

//             </div>
//             <p className="text-sm text-slate-500 mt-1">{card.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* Activity Feed */}
//       <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
//         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
//             <h2 className="text-slate-900">Recent Activity</h2>
//             <span className="text-sm text-slate-400">{activities.length} events</span>
//         </div>

//         {activities.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-16 px-6">
//             <div className="size-12 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
//               <ActivityIcon className="size-6 text-slate-400"/>
//             </div>
//             <p className="text-slate-500">No activity yet</p>
//             <p className="text-slate-400 text-sm mt-1">Connect accounts and schedule posts to see events here.</p>
//           </div>
//         ) : (
//           <div className="divide-y divide-slate-50">
//             {activities.map((activity)=>(
//               <div key={activity._id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
//                 <div className="size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-zinc-100 text-zinc-600">
//                   <SendIcon className="size-4" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between gap-2 mb-1">
//                     <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">Published</span>
//                     <span className="text-xs text-slate-400 shrink-0">{new Date(activity.createdAt).toLocaleString()}</span>
//                   </div>
//                     <p className="text-sm text-slate-600">{activity.description}</p>
//                 </div>
//               </div>
//             ))}

//           </div>
//         )}
//       </div>

//     </div>
//   )
// }

// export default Dashboard

import { ActivityIcon, CheckCircleIcon, ClockIcon, SendIcon, Share2Icon, TrendingUpIcon } from "lucide-react"
import { useEffect, useState } from "react"
import api from "../api/axios"

const Dashboard = () => {

  const [stats, setStats] = useState({ scheduled: 0, published: 0, connectedAccounts: 0 })
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [postsRes, accountsRes, activityRes] = await Promise.all([api.get("/api/posts"), api.get("/api/accounts"), api.get("/api/activity")])

        const posts = postsRes.data;
        setStats({
          scheduled: posts.filter((p: any) => p.status === 'scheduled').length,
          published: posts.filter((p: any) => p.status === 'published').length,
          connectedAccounts: accountsRes.data.filter((a: any) => a.status === 'connected').length,
        })
        setActivities(activityRes.data)
      } catch (error: any) {
        console.error("Error fetching dashboard data", error)
      }
    };
    fetchDashboardData();
  }, [])

  const statCards = [
    {
      title: "Scheduling",
      value: stats.scheduled,
      label: "scheduled posts",
      description: "Plan and queue your posts now — we'll publish them at the perfect time across every channel.",
      icon: ClockIcon,
      bg: "bg-yellow-200",
      title_color: "text-yellow-700",
      text_color: "text-yellow-950",
      span: "lg:col-span-7 lg:row-span-2",
    },
    {
      title: "Published",
      value: stats.published,
      label: "posts shipped",
      description: "Everything you've sent live, in one feed.",
      icon: CheckCircleIcon,
      bg: "bg-yellow-500",
      title_color: "text-yellow-700",
      text_color: "text-yellow-950",
      span: "lg:col-span-5",
    },
    {
      title: "Accounts",
      value: stats.connectedAccounts,
      label: "connected",
      description: "All your social profiles managed from a single dashboard.",
      icon: Share2Icon,
      bg: "bg-yellow-900",
      title_color: "text-yellow-200",
      text_color: "text-yellow-100",
      span: "lg:col-span-5",
    },
    // {
    //   title: "Inbox",
    //   value: "0",
    //   label: "new mentions",
    //   description: "Track replies, mentions and DMs across all your platforms in one stream.",
    //   icon: ActivityIcon,
    //   bg: "bg-yellow-300",
    //   title_color: "text-yellow-700",
    //   text_color: "text-yellow-950",
    //   span: "lg:col-span-7",
    // },
  ]

  return (
    <div className="space-y-8 ">
      {/* Full-width banner */}
      <div className="w-full -mt-px">
        <img
          src="./src/assets/connect.png"
          alt="postbee"
          className="w-full h-100 md:h-105 object-cover rounded-2xl"
        />
      </div>

      {/* Welcome bar */}
      {/* <div>
        <h2 className="text-2xl text-slate-900">Welcome back👋</h2>
        <p className="text-slate-500 text-sm mt-0.5">Here's what's happening with your postbee accounts today.</p>
      </div> */}

      {/* Bento stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 w-full auto-rows-[180px]">
        {statCards.map((card) => {
          // const Icon = card.icon
          return (
            <div
              key={card.title}
              className={`${card.bg} ${card.span} rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-transform hover:scale-[1.01]`}
            >
              <div className="flex items-start justify-between">
                <h3 className={`text-3xl md:text-4xl font-semibold ${card.title_color}`}>{card.title}</h3>
                {/* <div className="size-12 rounded-2xl bg-white/50 backdrop-blur flex items-center justify-center shrink-0">
                  <Icon className={`size-6 ${card.title_color}`} />
                </div> */}
              </div>
              <div className="flex items-end justify-between gap-4">
                <p className={`text-sm md:text-base ${card.text_color} opacity-80 max-w-sm`}>
                  {card.description}
                </p>
                <div className="text-right shrink-0">
                  <div className={`text-5xl md:text-6xl font-bold ${card.text_color} tabular-nums leading-none`}>
                    {card.value}
                  </div>
                  <div className={`mt-1 text-xs font-medium ${card.title_color} uppercase tracking-wide`}>
                    {card.label}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-slate-900">Recent Activity</h2>
          <span className="text-sm text-slate-400">{activities.length} events</span>
        </div>

        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="size-12 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
              <ActivityIcon className="size-6 text-slate-400" />
            </div>
            <p className="text-slate-500">No activity yet</p>
            <p className="text-slate-400 text-sm mt-1">Connect accounts and schedule posts to see events here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {activities.map((activity) => (
              <div key={activity._id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                <div className="size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-zinc-100 text-zinc-600">
                  <SendIcon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">Published</span>
                    <span className="text-xs text-slate-400 shrink-0">{new Date(activity.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-slate-600">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard