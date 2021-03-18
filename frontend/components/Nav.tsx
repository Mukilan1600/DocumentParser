import useUser from "./Stores/useUser";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Nav() {
  const { user, logout, logoutLoading } = useUser({});
  return (
    <div className="py-2 px-3 bg-gray-900 text-white flex flex-row w-full items-center justify-between">
      <div className="font-mono font-bold text-4xl">DP</div>
      <div className="flex space-x-2 items-center">
        {user &&<>
         <div>Hello {user.name}!</div>
        <div><button onClick={logout} className="bg-red-600 rounded-lg py-1 px-2 w-20 shadow-sm hover:bg-red-800">{logoutLoading?<FontAwesomeIcon icon={faSpinner} className="animate-spin" />:"Logout"}</button></div></>}
        <div>
          <a
            href="https://github.com/Mukilan1600/DocumentParser"
            target="_blank"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
}
