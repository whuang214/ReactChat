// CustomSelectComponents.jsx
import { components } from "react-select";

export const Option = (props) => (
  <components.Option {...props}>
    <div className="flex items-center">
      <img
        src={props.data.avatarUrl}
        alt=""
        className="w-6 h-6 rounded-full mr-2"
      />
      <span>{props.data.label}</span>
    </div>
  </components.Option>
);

export const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>
    <div className="flex items-center">
      <img
        src={props.data.avatarUrl}
        alt=""
        className="w-6 h-6 rounded-full mr-2"
      />
      {children}
    </div>
  </components.SingleValue>
);

export const MultiValue = (props) => (
  <components.MultiValue {...props}>
    <div className="flex items-center">
      <img
        src={props.data.avatarUrl}
        alt=""
        className="w-6 h-6 rounded-full mr-2"
      />
      <span>{props.data.label}</span>
    </div>
  </components.MultiValue>
);
