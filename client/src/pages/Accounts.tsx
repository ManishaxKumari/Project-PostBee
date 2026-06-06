import { useEffect, useState } from "react"
import { PLATFORMS } from "../assets/assets"
import { PlusIcon } from "lucide-react"
import AccountList from "../components/AccountList"
import PlatformPickerModal from "../components/PlatformPickerModal"
import toast from "react-hot-toast"
import api from "../api/axios"

const Accounts = () => {
  const [accounts, setAccounts] = useState<any[]>([])
  const [connecting, setConnecting] = useState<string | null>(null)
  const [showPlatformPicker, setShowPlatformPicker] = useState(false)

  const fetchAccounts = async (isSync = false, platform?: string | null, successMsg?: string) => {
    try {
      if (isSync) {
        const label = platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : "Social Media";
        toast.loading(`Syncing ${label} account...`, { id: "sync" });
        await api.get("/api/oauth/sync");
        toast.success(successMsg || "Accounts synced!", { id: "sync" })
      }
      const { data } = await api.get("/api/accounts")
      setAccounts(data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to load accounts");
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connectedPlatform = params.get("connected");
    const connectedUsername = params.get("username");
    const syncNeeded = params.get("sync") === "true";
    const errorMsg = params.get("error");

    window.history.replaceState({}, document.title, window.location.pathname)

    if (connectedPlatform) {
      const label = connectedPlatform.charAt(0).toUpperCase() + connectedPlatform.slice(1);
      const handle = connectedUsername ? ` (@${connectedUsername})` : ""
      fetchAccounts(true, connectedPlatform, `${label}${handle} connected!`)
    } else if (errorMsg) {
      toast.error(`Connection failed: ${decodeURIComponent(errorMsg)}`)
      fetchAccounts();
    } else if (syncNeeded) {
      fetchAccounts(true, null, "Accounts synced!")
    } else {
      fetchAccounts()
    }
  }, [])

  const handleConnect = async (platformId: string) => {
    setConnecting(platformId);
    try {
      const { data } = await api.get(`/api/oauth/${platformId}/url`);
      window.location.href = data.url;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || `Failed to connect ${platformId}`)
      setConnecting(null)
    }
  }

  const handleDisconnect = async (accountId: string) => {
    try {
      await api.delete(`/api/accounts/${accountId}`)
      toast.success("Account disconnected")
      await fetchAccounts()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to disconnect account")
    }
  }

  const connectedIds = accounts.map((a) => a.platform)

  return (
    <div className=" border-[3px] border-black rounded-2xl overflow-hidden shadow-[8px_8px_0_0_#000]min-h-full h-full bg-amber-300 flex items-center justify-center p-4"
            style={{
                backgroundImage:
                    "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                backgroundBlendMode: "soft-light",
            }}>
    <div className="space-y-8">
      {/* Banner */}
      {/* <div className="w-full relative">
        <div className="border-[3px] border-black rounded-2xl overflow-hidden shadow-[8px_8px_0_0_#000] bg-amber-300">
          <img
            src="./src/assets/connect.png"
            alt="postbee"
            className="w-full h-80 md:h-[20rem] object-cover"
          />
        </div>
        <span className="hidden md:inline-block absolute -top-3 -right-3 rotate-[8deg] bg-rose-400 border-[3px] border-black px-4 py-1.5 text-sm font-black uppercase shadow-[4px_4px_0_0_#000] rounded-full">
          all your hives ⚡
        </span>
      </div> */}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border-[3px] border-black rounded-2xl p-5 shadow-[6px_6px_0_0_#000]">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight">Connected Accounts</h2>
          <p className="text-black/70 text-sm mt-1 font-bold">
            {accounts.length} of {PLATFORMS.length} platforms connected
          </p>
        </div>
        <button
          onClick={() => setShowPlatformPicker(true)}
          className="flex items-center gap-2 px-5 py-3 bg-amber-400 border-[3px] border-black text-black rounded-xl font-black uppercase text-sm shadow-[5px_5px_0_0_#000] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000] transition w-full sm:w-auto justify-center"
        >
          <PlusIcon className="size-4" /> Connect Account
        </button>
      </div>

      {showPlatformPicker && (
        <PlatformPickerModal
          connectedIds={connectedIds}
          connecting={connecting}
          onClose={() => setShowPlatformPicker(false)}
          onConnect={handleConnect}
        />
      )}

      <AccountList accounts={accounts} onDisconnect={handleDisconnect} />
    </div>
    </div>
  )
}

export default Accounts
