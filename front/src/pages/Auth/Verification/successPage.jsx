import CountdownRedirect from "./CountdownRedirect";

const SuccessPage = () => (
  <div className="flex flex-col  justify-center h-[calc(100vh-150px)]">
    <div className="flex text-white flex-col align-items-center">
      <h1 className="mono-600 text-green-400">Verication Success</h1>
      <p className="mono-400">
        You have successfully verified your email address.
      </p>
      <CountdownRedirect />
    </div>
  </div>
);

export default SuccessPage;
