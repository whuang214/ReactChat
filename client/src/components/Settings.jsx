import { useAuth } from "../context/AuthContext";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { BlockPicker, ChromePicker, GithubPicker } from 'react-color';
const API_URL = import.meta.env.VITE_API_URL;

export const Settings = () => {
  const {user, loading} = useAuth();
  const [color, setColor] = useState('#ffffff'); // Initial color state
  const [data, setData] = useState(null);

  // const getColors = async () => {
  //   try{
  //     const response = await axios.get(`${API_URL}/user/getSettings`, {withCredentials: true,})
  //     .then((response) => {
  //       console.log(response.data.mainColor);
  //       setData(response.data)
  //       console.log(data);
  //     });
  //   } catch (error) {
  //     console.error(error)
  //   } 
  // }

  const handleColorChange = async (newColor) => {
    setColor(newColor.hex)
    await updateUser(getColorName(newColor.hex));
  };
  
  function getColorName(colorCode) {
    let colorName;
    switch (colorCode) {
      case '#a855f7':
        colorName = 'purple';
        break;
      case '#93c5fd':
        colorName = 'blue';
        break;
      case '#4338ca':
        colorName = 'indigo';
        break;
      case '#f9a8d4':
        colorName = 'pink';
        break;
      case '#ef4444':
        colorName = 'red';
        break;
      case '#f97316':
        colorName = 'orange';
        break;
      case '#ffc107':
        colorName = 'yellow';
        break;
      case '#a3e635':
        colorName = 'green';
        break;
      case '#14b8a6':
        colorName = 'teal';
        break;
      case '#22d3ee':
        colorName = 'cyan';
        break;
    }
     return colorName;
  }

  const updateUser = async (newColor) => {
    // console.log(document.getElementById('color-picker').color)

    console.log(newColor)
    try {
      // make post request here
      const response = await axios.post(`${API_URL}/user/updateSettings`,
          {
            colors: {
              mainColor:  "bg-" + newColor,
              darkColor:  "bg-" + newColor + "-dark",
              lightColor: "bg-" + newColor + "-light",
            }
          },
          {
            withCredentials: true,
          }
        );

    } catch (error) {
      console.error("Error Updating users:" + error)
    }
  }

  // useEffect(() => {
  //   // Fetch data from the server
  //   getColors().then((result) => {
  //     setData(result);
  //   });
  // }, []);

  // if (!data) {
  //   // Render loading indicator or placeholder
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="m-auto bg-white rounded-lg shadow-lg p-4 overflow-auto">
     <div>
       <h1 className="panel-header mb-2">Select a Color</h1>
       <GithubPicker id="color-picker"
       width="140px"
       colors={[
         /*$blue:  */  "#93c5fd",
         /*$indigo:*/  "#4338ca",
         /*$pink:  */  "#f9a8d4",
         /*$purple:*/  "#a855f7",
         /*$red:   */  "#ef4444",
         /*$orange:*/  "#f97316",
         /*$yellow:*/  "#ffc107",
         /*$green: */  "#a3e635",
         /*$teal:  */  "#14b8a6",
         /*$cyan:  */  "#22d3ee",
       ]}
           color={color} onChange={handleColorChange} />
           
           <div className={user.colors.mainColor}>main</div>
           <div className={user.colors.darkColor}>dark</div>
           <div className={user.colors.lightColor}>light</div>
     </div>
  </div>
  );
  
};
