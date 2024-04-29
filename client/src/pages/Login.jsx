// LoginPage.jsx
import GitHubLogo from "/github.png";

const API_URL = import.meta.env.VITE_API_URL;

export const Login = ({ onGitHubLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-purple-500 to-blue-500">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-purple-800">
          ReactChat
        </h1>
        <h2 className="mb-4 text-2xl font-bold text-center">Welcome Back!</h2>
        <p className="mb-8 text-lg text-center text-gray-700">
          Log in to connect with the community
        </p>
        <a
          href={`${API_URL}/auth/github`}
          className="flex items-center justify-center w-full px-6 py-3 text-lg font-bold text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-900"
          style={{ gap: "10px" }} // Using gap for spacing between text and the logo
        >
          <img src={GitHubLogo} alt="GitHub logo" className="w-6 h-6" />
          Login with GitHub
        </a>
      </div>
    </div>
  );
};
