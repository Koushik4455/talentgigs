import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const App = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState();
  const [randomNumber, setRandomNumber] = useState("");
  const [mount, setMount] = useState("");
  const [dropdown, setDropdown] = useState();

  // useEffect(() => {
  //   axios
  //     .get("https://mocki.io/v1/b0c7d7ea-5d09-4b9c-8d4b-c1b40cc39bc9")
  //     .then((res) => {
  //       const data = res.data?.comments.map((x) => x.taggedTo);
  //       const flattenedArray = data.flat();

  //       // Remove duplicates using a Set
  //       const data1 = [...new Set(flattenedArray)];
  //       const TagedNames = data1.map((name) => {
  //         return { value: name, label: name };
  //       });
  //       setMount(TagedNames);
  //       setDropdown(TagedNames)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     });
  // }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    axios
      .get("https://mocki.io/v1/b0c7d7ea-5d09-4b9c-8d4b-c1b40cc39bc9")
      .then((res) => {
        setComment(res.data?.comments);
        const data = res.data?.comments.map((x) => x.taggedTo);
        const flattenedArray = data.flat();

        // Remove duplicates using a Set
        const data1 = [...new Set(flattenedArray)];
        const TagedNames = data1.map((name) => {
          return { value: name, label: name };
        });
        setMount(TagedNames);
        setDropdown(TagedNames)
      }).catch((err) => {
        console.log(err)
      });
    generateRandomNumber();
  }, []);
  const generateRandomNumber = () => {
    const min = Math.pow(10, 11); // Minimum 12-digit number (100000000000)
    const max = Math.pow(10, 12) - 1; // Maximum 12-digit number (999999999999)
    const generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(generatedNumber.toString());
  };


  return (
    <div>
      <form>

        <Select
          // id="dropdown"
          // value={selectedOption}
          // onChange={handleChange}
          options={dropdown}
          className="Dropdown"
        />
        {/* <option value="">DropDown</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option> */}
        {/* </select> */}
      </form>

      <button className="AddComment" onClick={togglePopup}>
        Add Comment
      </button>

      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3 className="returnid">LOGIN ID: {randomNumber}</h3>

            {comment?.map((item) => {
              const userfullname = item.updatedBy?.split(",");

              const userinitials = userfullname?.map((name) => {
                const words = name?.trim()?.split(" ");
                if (words?.length > 1) {
                  const firstInitial = words[0]?.charAt(0).toUpperCase();
                  const lastInitial = words[words?.length - 1]
                    ?.charAt(0)
                    ?.toUpperCase();
                  return `${firstInitial}${lastInitial}`;
                } else {
                  return words[0]?.slice(0, 2)?.toUpperCase(); // Extract the first two characters as initials
                }
              });
              return (
                <>
                  <div className="addcard">
                    <h2>
                      {" "}
                      <span className="iconname">{userinitials}</span>
                    </h2>

                    <p className="commemt-text">{item.comment}</p>
                    <p className="commemt-text">{item.updatedOn}</p>


                  </div>
                </>
              );
            })}
            <form>
              <textarea className="textaera" placeholder="Your COmment" />
              <Select options={mount} isMulti closeMenuOnSelect={false} />
            </form>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
