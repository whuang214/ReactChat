// LoginPage.jsx
import GitHubLogo from "/github.png";

const API_URL = import.meta.env.VITE_API_URL;

export const Login = ({ onGitHubLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-8 text-4xl font-bold text-purple-700">ReactChat</div>
      <div className="px-8 py-6 text-center bg-white shadow-lg rounded-lg">
        <h3 className="mb-4 text-2xl font-bold">Welcome Back!</h3>
        <p className="mb-6 text-gray-600">
          Log in to connect with the community
        </p>
        <a
          href={`${API_URL}/auth/github`}
          className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-black rounded hover:bg-gray-800"
        >
          <img src={GitHubLogo} alt="GitHub logo" className="w-6 h-6 mr-2" />
          Login with GitHub
        </a>
      </div>
    </div>
  );
};
