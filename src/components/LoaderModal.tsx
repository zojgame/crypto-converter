import LoaderIcon from "../icons/LoaderIcon";

export default function LoaderModal() {
  return (
    <div className="h-screen w-screen backdrop-blur-lg absolute left-0 top-0 z-10 text-white flex justify-center items-center">
      <div className="animate-spin">
        <LoaderIcon />
      </div>
    </div>
  );
}
