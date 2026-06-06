import { ActivityIcon, CheckCircleIcon, ClockIcon, SendIcon, Share2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import api from "../api/axios"

const Dashboard = () => {
  const [stats, setStats] = useState({ scheduled: 0, published: 0, connectedAccounts: 0 })
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [postsRes, accountsRes, activityRes] = await Promise.all([
          api.get("/api/posts"),
          api.get("/api/accounts"),
          api.get("/api/activity"),
        ])
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
      bg: "bg-amber-300",
      span: "lg:col-span-7 lg:row-span-2",
    },
    {
      title: "Published",
      value: stats.published,
      label: "posts shipped",
      description: "Everything you've sent live, in one feed.",
      icon: CheckCircleIcon,
      bg: "bg-emerald-300",
      span: "lg:col-span-5",
    },
    {
      title: "Accounts",
      value: stats.connectedAccounts,
      label: "connected",
      description: "All your social profiles managed from a single dashboard.",
      icon: Share2Icon,
      bg: "bg-rose-400",
      span: "lg:col-span-5",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Banner */}
      {/* <div className="w-full relative">
        <div className="border-[3px] border-black rounded-2xl overflow-hidden shadow-[8px_8px_0_0_#000] bg-amber-300">
          <img
            src="./src/assets/banner.png"
            alt="postbee"
            className="w-full h-80 md:h-[26rem] object-cover"
          />
        </div>
        <span className="hidden md:inline-block absolute -top-3 -left-3 rotate-[-6deg] bg-sky-300 border-[3px] border-black px-4 py-1.5 text-sm font-black uppercase shadow-[4px_4px_0_0_#000] rounded-full">
          welcome back 👋
        </span>
      </div> */}

      {/* Bento stat cards */}
      <div className=" mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 w-full auto-rows-[200px]">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className={`${card.bg} ${card.span} border-[3px] border-black rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-[8px_8px_0_0_#000] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] transition`}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black">{card.title}</h3>
                <div className="size-12 border-[3px] border-black rounded-xl bg-white flex items-center justify-center shrink-0 shadow-[3px_3px_0_0_#000]">
                  <Icon className="size-6 text-black" />
                </div>
              </div>
              <div className="flex items-end justify-between gap-4">
                <p className="text-sm md:text-base text-black/80 font-bold max-w-sm">
                  {card.description}
                </p>
                <div className="text-right shrink-0">
                  <div className="text-5xl md:text-6xl font-black text-black tabular-nums leading-none">
                    {card.value}
                  </div>
                  <div className="mt-1 text-xs font-black text-black uppercase tracking-wide">
                    {card.label}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Activity Feed */}
      <div className="bg-white border-[3px] border-black rounded-2xl overflow-hidden shadow-[8px_8px_0_0_#000]">
        <div className="flex items-center justify-between px-6 py-4 border-b-[3px] border-black bg-amber-300">
          <h2 className="font-black uppercase tracking-tight text-xl">Recent Activity</h2>
          <span className="text-xs font-black bg-white border-[2px] border-black px-2 py-0.5 rounded-full">
            {activities.length} events
          </span>
        </div>

        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="size-14 bg-amber-200 border-[3px] border-black rounded-xl flex items-center justify-center mb-3 shadow-[4px_4px_0_0_#000]">
              <ActivityIcon className="size-6 text-black" />
            </div>
            <p className="font-black uppercase">No activity yet</p>
            <p className="text-black/60 text-sm mt-1 font-bold">Connect accounts and schedule posts to see events here.</p>
          </div>
        ) : (
          <div className="divide-y-[3px] divide-black">
            {activities.map((activity) => (
              <div key={activity._id} className="flex items-start gap-4 px-6 py-4 hover:bg-amber-50 transition-colors">
                <div className="size-10 border-[3px] border-black rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-emerald-300 shadow-[3px_3px_0_0_#000]">
                  <SendIcon className="size-4 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-black uppercase px-2 py-0.5 rounded-full bg-emerald-200 border-[2px] border-black">Published</span>
                    <span className="text-xs text-black/60 shrink-0 font-bold">{new Date(activity.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-sm font-bold">{activity.description}</p>
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
