import { useDispatch, useSelector } from "react-redux";
import { toggleNavbarPage } from "../../../redux/adminSlices/adminDashboardSlice/DashboardSlice";

const UserProfile = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.currentUser);
  const displayName = currentUser?.username || currentUser?.email || "User";
  return (
    <div className=" dark:text-gray-200  dark:bg-secondary-dark-bg  rounded-xl w-[250px]  p-5 absolute top-0 right-0   bg-no-repeat   bg-blue-50 h-44  ">
      <div>
        <div className="flex justify-between w-full items-center gap-20">
          <p className="font-bold text-gray-400 capitalize truncate">{displayName}</p>
          <button className="text-black " onClick={()=> dispatch(toggleNavbarPage('userProfile'))}>
            <div className="hover:bg-slate-200  px-3 py-1 rounded-full">x</div>
          </button>
        </div>

        <p className="text-sm text-black break-all mt-2">{currentUser?.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
