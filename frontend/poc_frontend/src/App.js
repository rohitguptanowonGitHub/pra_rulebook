// import React, { useState } from "react";
// import "./App.css";

// const data = {
//   "COR001 Own Funds": {
//     schedules: {
//       "C 02.00 - CREDIT AND COUNTERPARTY CREDIT RISK": [
//         "Exposure in default subject to the support of 1075%-1520%",
//       ],
//     },
//   },
//   "COR002 Market Risk": {
//     schedules: {
//       "C 03.00 - Market Risk": [
//         "Market exposure subject to support of 500%-1000%",
//       ],
//     },
//   },
// };

// function App() {
//   const [selectedReturn, setSelectedReturn] = useState("");
//   const [selectedSchedule, setSelectedSchedule] = useState("");
//   const [selectedItem, setSelectedItem] = useState("");

//   const handleReturnChange = (event) => {
//     setSelectedReturn(event.target.value);
//     setSelectedSchedule("");
//     setSelectedItem("");
//   };

//   const handleScheduleChange = (event) => {
//     setSelectedSchedule(event.target.value);
//     setSelectedItem("");
//   };

//   return (
//     <div className="container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="logo">Logo</div>
//         <div className="bank-name">Bank Name</div>
//       </div>

//       {/* Main Content */}
//       <div className="main">
//         <h2 className="header">Custom Website Header</h2>

//         {/* Dropdown Section */}
//         <div className="dropdown-section">
//           <div className="dropdown">
//             <label>Return ID/ Name:</label>
//             <select value={selectedReturn} onChange={handleReturnChange}>
//               <option value="">Select Return</option>
//               {Object.keys(data).map((returnName) => (
//                 <option key={returnName} value={returnName}>
//                   {returnName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="dropdown">
//             <label>Schedules:</label>
//             <select
//               value={selectedSchedule}
//               onChange={handleScheduleChange}
//               disabled={!selectedReturn}
//             >
//               <option value="">Select Schedule</option>
//               {selectedReturn &&
//                 Object.keys(data[selectedReturn].schedules).map((schedule) => (
//                   <option key={schedule} value={schedule}>
//                     {schedule}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           <div className="dropdown">
//             <label>Item Value/ ID:</label>
//             <select
//               value={selectedItem}
//               onChange={(e) => setSelectedItem(e.target.value)}
//               disabled={!selectedSchedule}
//             >
//               <option value="">Select Item</option>
//               {selectedSchedule &&
//                 data[selectedReturn].schedules[selectedSchedule].map(
//                   (item, index) => (
//                     <option key={index} value={item}>
//                       {item}
//                     </option>
//                   )
//                 )}
//             </select>
//           </div>

//           <button className="interpret-button">Perform Interpretation</button>
//         </div>

//         {/* Table Section */}
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Rules</th>
//               <th>Interpretations</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{selectedReturn}</td>
//               <td>{selectedSchedule}</td>
//               <td>{selectedItem}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
 
// export default App;



import React, { useState, useEffect } from "react";
import "./App.css";

// const data = {
//   "COR001 Own Funds": {
//     schedules: {
//       "C 02.00 - CREDIT AND COUNTERPARTY CREDIT RISK": [
//         "Exposure in default subject to the support of 1075%-1520%",
//       ],
//     },
//   },
//   "COR002 Market Risk": {
//     schedules: {
//       "C 03.00 - Market Risk": [
//         "Market exposure subject to support of 500%-1000%",
//       ],
//     },
//   },
// };

const  data = {
  "COR001 Own Funds": {
    "schedules": {
      "Index - Schedule": ["Dummy data for Index - Schedule"],
      "1 - Schedule": ["Dummy data for 1 - Schedule"],
      "2 - Schedule": ["Dummy data for 2 - Schedule"],
      "3 - Schedule": ["Dummy data for 3 - Schedule"],
      "4 - Schedule": ["Dummy data for 4 - Schedule"],
      "5.1 - Schedule": ["Dummy data for 5.1 - Schedule"],
      "5.2 - Schedule": ["Dummy data for 5.2 - Schedule"],
      "6.1 - Schedule": ["Dummy data for 6.1 - Schedule"],
      "6.2 - Schedule": ["Dummy data for 6.2 - Schedule"],
      "7 - Schedule": ["SA Exposure class",
        "TOTAL EXPOSURES",
        "of which: Defaulted exposures",
        "of which: SME",
        "of which: Exposures subject to SME-supporting factor",
        "of which: Exposures subject to the Infrastructure supporting factor",
        "of which: Secured by mortgages on immovable property - Residential property",
        "of which: Exposures under the permanent partial use of the standardised approach",
        "of which: Exposures under the standardised approach with prior supervisory permission to carry out a sequential IRB implementation",
        "On balance sheet exposures subject to credit risk",
        "Off balance sheet exposures subject to credit risk",
        "Exposures / Transactions subject to counterparty credit risk",
        "Securities Financing Transactions netting sets",
        "of which: centrally cleared through a QCCP",
        "Derivatives & Long Settlement Transactions netting sets",
        "of which: centrally cleared through a QCCP",
        "From Contractual Cross Product netting sets",
        "1 250%", "Other risk weights", "Look-through approach",
        "Mandate-based approach", "Fall-back approach",
        "Exposures secured by mortgages on commercial immovable property",
        "Exposures in default subject to a risk weight of 100%",
        "Exposures secured by mortgages on residential property",
        "Exposures in default subject to a risk weight of 150%"],
      "8.1 - Schedule": ["Dummy data for 8.1 - Schedule"],
      "8.2 - Schedule": ["Dummy data for 8.2 - Schedule"],
      "8.3 - Schedule": ["Dummy data for 8.3 - Schedule"],
      "8.4 - Schedule": ["Dummy data for 8.4 - Schedule"],
      "8.5 - Schedule": ["Dummy data for 8.5 - Schedule"],
      "8.5.1 - Schedule": ["Dummy data for 8.5.1 - Schedule"],
      "8.6 - Schedule": ["Dummy data for 8.6 - Schedule"],
      "8.7 - Schedule": ["Dummy data for 8.7 - Schedule"],
      "9.1 - Schedule": ["Dummy data for 9.1 - Schedule"],
      "9.2 - Schedule": ["Dummy data for 9.2 - Schedule"],
      "9.4 - Schedule": ["Dummy data for 9.4 - Schedule"],
      "10.1 - Schedule": ["Dummy data for 10.1 - Schedule"],
      "10.2 - Schedule": ["Dummy data for 10.2 - Schedule"],
      "11 - Schedule": ["Dummy data for 11 - Schedule"],
      "13.1 - Schedule": ["Dummy data for 13.1 - Schedule"],
      "14 - Schedule": ["Dummy data for 14 - Schedule"],
      "14.1 - Schedule": ["Dummy data for 14.1 - Schedule"],
      "34.1 - Schedule": ["Dummy data for 34.1 - Schedule"],
      "34.2 - Schedule": ["Dummy data for 34.2 - Schedule"],
      "34.3 - Schedule": ["Dummy data for 34.3 - Schedule"],
      "34.4 - Schedule": ["Dummy data for 34.4 - Schedule"],
      "34.5 - Schedule": ["Dummy data for 34.5 - Schedule"],
      "34.6 - Schedule": ["Dummy data for 34.6 - Schedule"],
      "34.7 - Schedule": ["Dummy data for 34.7 - Schedule"],
      "34.8 - Schedule": ["Dummy data for 34.8 - Schedule"],
      "34.9 - Schedule": ["Dummy data for 34.9 - Schedule"],
      "34.10 - Schedule": ["Dummy data for 34.10 - Schedule"],
      "34.11 - Schedule": ["Dummy data for 34.11 - Schedule"],
      "16 - Schedule": ["Dummy data for 16 - Schedule"],
      "17.1 - Schedule": ["Dummy data for 17.1 - Schedule"],
      "17.2 - Schedule": ["Dummy data for 17.2 - Schedule"],
      "18 - Schedule": ["Dummy data for 18 - Schedule"],
      "19 - Schedule": ["Dummy data for 19 - Schedule"],
      "20 - Schedule": ["Dummy data for 20 - Schedule"],
      "21 - Schedule": ["Dummy data for 21 - Schedule"],
      "22 - Schedule": ["Dummy data for 22 - Schedule"],
      "23 - Schedule": ["Dummy data for 23 - Schedule"],
      "24 - Schedule": ["Dummy data for 24 - Schedule"],
      "25 - Schedule": ["Dummy data for 25 - Schedule"],
      "32.1 - Schedule": ["Dummy data for 32.1 - Schedule"],
      "32.2 - Schedule": ["Dummy data for 32.2 - Schedule"],
      "32.3 - Schedule": ["Dummy data for 32.3 - Schedule"],
      "32.4 - Schedule": ["Dummy data for 32.4 - Schedule"],
      "33 - Schedule": ["Dummy data for 33 - Schedule"],
      "35.1 - Schedule": ["Dummy data for 35.1 - Schedule"],
      "35.2 - Schedule": ["Dummy data for 35.2 - Schedule"],
      "35.3 - Schedule": ["Dummy data for 35.3 - Schedule"],
    },
  },
  "COR002 Market Risk": {
    "schedules": {
      "C 03.00 - Market Risk": [
        "Market exposure subject to support of 500%-1000%"
      ],
    },
  },
  "COR002 Large Exposures": {
    "schedules": {
      "LE 01.00 - Large Exposures": [
        "Dummy data for Large Exposures"
      ],
    },
  },
  "COR011 LCR DA": {
    "schedules": {
      "LCR 02.00 - Liquidity Coverage Ratio": [
        "Dummy data for LCR DA"
      ],
    },
  },
  "COR017 COREP NSFR": {
    "schedules": {
      "NSFR 01.00 - Net Stable Funding Ratio": [
        "Dummy data for COREP NSFR"
      ],
    },
  },
  "FRP001 Financial Reporting": {
    "schedules": {
      "FR 01.00 - Financial Reporting": [
        "Dummy data for Financial Reporting"
      ],
    },
  },
  "FSA078 Concentration Risk Minimum Data Requirements": {
    "schedules": {
      "CR 01.00 - Concentration Risk": [
        "Dummy data for Concentration Risk Minimum Data Requirements"
      ],
    },
  },
  "LVR001 Leverage Ratio": {
    "schedules": {
      "LR 01.00 - Leverage Ratio": [
        "Dummy data for Leverage Ratio"
      ],
    },
  },
  "PRA110 Cash Flow Mismatch": {
    "schedules": {
      "CFM 01.00 - Cash Flow Mismatch": [
        "Dummy data for Cash Flow Mismatch"
      ],
    },
  },
  "FSA072 Operational Risk Historical Losses": {
    "schedules": {
      "OR 01.00 - Historical Losses": [
        "Dummy data for Operational Risk Historical Losses"
      ],
    },
  },
  "FSA073 Operational Risk Historical Losses Detail": {
    "schedules": {
      "OR 02.00 - Historical Losses Detail": [
        "Dummy data for Operational Risk Historical Losses Detail"
      ],
    },
  },
  "FSA074 Operational Risk Forecast Losses": {
    "schedules": {
      "OR 03.00 - Forecast Losses": [
        "Dummy data for Operational Risk Forecast Losses"
      ],
    },
  },
  "FSA075 Operational Risk Scenario Data": {
    "schedules": {
      "OR 04.00 - Scenario Data": [
        "Dummy data for Operational Risk Scenario Data"
      ],
    },
  },
  "FSA017 Interest rate gap report": {
    "schedules": {
      "IR 01.00 - Interest Rate Gap": [
        "Dummy data for Interest Rate Gap Report"
      ],
    },
  }
};

function App() {
  const [selectedReturn, setSelectedReturn] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [tableData, setTableData] = useState([]); // Stores table data
  const [interpretation, setInterpretation] = useState("");
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [articles, setArticles] = useState("");

  async function getInterpretation(selectedItem) {
    await fetch(`http://127.0.0.1:8000/process?input_value=${selectedItem}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setInterpretation(data.output);
        setArticles(data.articles);
        console.log(data.output);
      });
  }
useEffect(() => {
    if (isInterpreting) {
      const updatedSchedule = `${selectedReturn} ${selectedSchedule} ${selectedItem}`;
      setTableData((prevData) => [
        ...prevData,
        { returnId: updatedSchedule, schedule: articles, item: interpretation },
      ]);
      setIsInterpreting(false);
    }
  }, [interpretation,articles]);
  // When Return is selected, auto-update Schedule & Item
  const handleReturnChange = (event) => {
    const newReturn = event.target.value;
    setSelectedReturn(newReturn);

    if (newReturn) {
      const firstSchedule = Object.keys(data[newReturn].schedules)[0] || "";
      setSelectedSchedule(firstSchedule);

      if (firstSchedule) {
        const firstItem = data[newReturn].schedules[firstSchedule][0] || "";
        setSelectedItem(firstItem);
      } else {
        setSelectedItem("");
      }
    } else {
      setSelectedSchedule("");
      setSelectedItem("");
    }
  };

  // When Schedule is selected, auto-update Item
  const handleScheduleChange = (event) => {
    const newSchedule = event.target.value;
    setSelectedSchedule(newSchedule);

    if (selectedReturn && newSchedule) {
      const firstItem = data[selectedReturn].schedules[newSchedule][0] || "";
      setSelectedItem(firstItem);
    } else {
      setSelectedItem("");
    }
  };

 // Handle Table Update
  // Handle Table Update
  const handlePerformInterpretation = async () => {
    if (selectedReturn && selectedSchedule && selectedItem) {
      setIsInterpreting(true);
      await getInterpretation(selectedItem);
    }
  };
  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">Logo</div>
        <div className="bank-name">Bank Name</div>
      </div>

      {/* Main Content */}
      <div className="main">
        <h2 className="header">Custom Website Header</h2>

        {/* Dropdown Section */}
        <div className="dropdown-section">
          {/* Return Dropdown */}
          <div className="dropdown">
            <label>Return ID/ Name:</label>
            <select value={selectedReturn} onChange={handleReturnChange}>
              <option value="">Select Return</option>
              {Object.keys(data).map((returnName) => (
                <option key={returnName} value={returnName}>
                  {returnName}
                </option>
              ))}
            </select>
          </div>

          {/* Schedule Dropdown */}
          <div className="dropdown">
            <label>Schedules:</label>
            <select
              value={selectedSchedule}
              onChange={handleScheduleChange}
              disabled={!selectedReturn}
            >
              <option value="">Select Schedule</option>
              {selectedReturn &&
                Object.keys(data[selectedReturn].schedules).map((schedule) => (
                  <option key={schedule} value={schedule}>
                    {schedule}
                  </option>
                ))}
            </select>
          </div>

          {/* Item Dropdown */}
          <div className="dropdown">
            <label>Item Value/ ID:</label>
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              disabled={!selectedSchedule}
            >
              <option value="">Select Item</option>
              {selectedSchedule &&
                data[selectedReturn].schedules[selectedSchedule].map(
                  (item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  )
                )}
            </select>
          </div>

          {/* Action Button */}
          <button className="interpret-button" onClick={handlePerformInterpretation}>
            Perform Interpretation
          </button>
        </div>

        {/* Table Section */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Title - Schedule - Item</th>
              <th>Articles</th>
              <th>Interpretations</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.returnId}</td>
                  <td>{row.schedule}</td>
                  <td>{row.item}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No data selected yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
