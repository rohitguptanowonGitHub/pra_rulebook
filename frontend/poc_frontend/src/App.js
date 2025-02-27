import React, { useState, useEffect } from "react";
import "./App.css";

const  data = {
  "COR001 Own Funds": {
    "schedules": {
      "C 01.00 - OWN FUNDS": ["Dummy data for 1 - Schedule"],
      "C 02.00 - OWN FUNDS REQUIREMENTS": ["Dummy data for 2 - Schedule"],
      "C 03.00 - CAPITAL RATIOS": ["Dummy data for 3 - Schedule"],
      "C 04.00 - MEMORANDUM ITEMS": ["Dummy data for 4 - Schedule"],
      "C 05.01 - TRANSITIONAL PROVISIONS": ["Dummy data for 5.1 - Schedule"],
      "C 05.02 - GRANDFATHERED INSTRUMENTS(CA5.2)": ["Dummy data for 5.2 - Schedule"],
      "C 06.01 - GROUP SOLVENCY-TOTAL": ["Dummy data for 6.1 - Schedule"],
      "C 06.02 - GROUP SOLVENCY": ["Dummy data for 6.2 - Schedule"],
      "C 07.00 - CR SA(CREDIT AND COUNTERPARTY CREDIT RISKS AND FREE DELIVERIES)": ["SA Exposure class",
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
      "C 08.01 - CR IRB1(CREDIT AND COUNTERPARTY CREDIT RISKS AND FREE DELIVERIES)": ["Dummy data for 8.1 - Schedule"],
      "C 08.02 - CR IRB2(CREDIT AND COUNTERPARTY CREDIT RISKS AND FREE DELIVERIES)": ["Dummy data for 8.2 - Schedule"],
      "C 08.03 - CR IRB3(CREDIT RISK AND FREE DELIVERIES)": ["Dummy data for 8.3 - Schedule"],
      "C 08.04 - CR IRB4(CREDIT RISK AND FREE DELIVERIES)": ["Dummy data for 8.4 - Schedule"],
      "C 08.05 - CR IRB5(CREDIT RISK AND FREE DELIVERIES)": ["Dummy data for 8.5 - Schedule"],
      "C 08.05.1- CREDIT RISK AND FREE DELIVERIES": ["Dummy data for 8.5.1 - Schedule"],
      "C 08.06 - CR IRB6(CREDIT RISK AND FREE DELIVERIES)": ["Dummy data for 8.6 - Schedule"],
      "C 08.07 - CR IRB7(CREDIT RISK AND FREE DELIVERIES)": ["Dummy data for 8.7 - Schedule"],
      "C 09.01 - CR GB 1(Table 9.1 - Geographical breakdown of exposures by residence of the obligor)": ["Dummy data for 9.1 - Schedule"],
      "C 09.02 - CR GB 2(Table 9.2 - Geographical breakdown of exposures by residence of the obligor)": ["Dummy data for 9.2 - Schedule"],
      "C 09.04 - CCB(Table 9.4 - Breakdown of credit exposures relevant for the calculation of the countercyclical buffer )": ["Dummy data for 9.4 - Schedule"],
      "C 10.01 - CR EQU IRB 1(CREDIT RISK)": ["Dummy data for 10.1 - Schedule"],
      "C 10.02 - CR EQU IRB 2(CREDIT RISk)": ["Dummy data for 10.2 - Schedule"],
      "C 11.00 - SETTLEMENT/DELIVERY RISK": ["Dummy data for 11 - Schedule"],
      "C 13.01 - CREDIT RISK: SECURITISATIONS": ["Dummy data for 13.1 - Schedule"],
      "C 14.00 - DETAILED INFORMATION ON SECURITISATIONS": ["Dummy data for 14 - Schedule"],
      "C 14.01 - DETAILED INFORMATION ON SECURITISATIONS BY APPROACH ": ["Dummy data for 14.1 - Schedule"],
      "C 34.01 - CCR 1(COUNTERPARTY CREDIT RISK)": ["Dummy data for 34.1 - Schedule"],
      "C 34.02 - CCR 2(COUNTERPARTY CREDIT RISK)": ["Dummy data for 34.2 - Schedule"],
      "C 34.03 - CCR 3(COUNTERPARTY CREDIT RISK)": ["Dummy data for 34.3 - Schedule"],
      "C 34.04 - CCR 4(COUNTERPARTY CREDIT RISK)": ["Dummy data for 34.4 - Schedule"],
      "C 34.05 - CCR 5(COUNTERPARTY CREDIT RISK)": ["Dummy data for 34.5 - Schedule"],
      "C 34.06 - CCR 6(COUNTERPARTY CREDIT RISK)": ["Dummy data for 34.6 - Schedule"],
      "C 34.07 - CCR 7(COUNTERPARTY CREDIT RISK)": ["Dummy data for 34.7 - Schedule"],
      "C 34.08 - CCR 8(COUNTERPARTY CREDIT RISK)": ["Dummy data for 34.8 - Schedule"],
      "C 34.09 - CCR 9(COUNTERPARTY CREDIT RISK)": ["Dummy data for 34.9 - Schedule"],
      "C 34.10 - CCR 10(COUNTERPARTY CREDIT RISK)": ["Dummy data for 34.10 - Schedule"],
      "C 34.11 - CCR 11(COUNTERPARTY CREDIT RISK)": ["Dummy data for 34.11 - Schedule"],
      "C 16.00 - OPERATIONAL RISK": ["Dummy data for 16 - Schedule"],
      "C 17.01 - OPERATIONAL RISK": ["Dummy data for 17.1 - Schedule"],
      "C 17.02 - OPERATIONAL RISK": ["Dummy data for 17.2 - Schedule"],
      "C 18.00 - MKR SA TDI(MARKET RISK)": ["Dummy data for 18 - Schedule"],
      "C 19.00 - MKR SA SEC(MARKET RISK)": ["Dummy data for 19 - Schedule"],
      "C 20.00 - MKR SA CTP(MARKET RISK)": ["Dummy data for 20 - Schedule"],
      "C 21.00 - MKR SA EQU(MARKET RISK)": ["Dummy data for 21 - Schedule"],
      "C 22.00 - MKR SA FX(MARKET RISK)": ["Dummy data for 22 - Schedule"],
      "C 23.00 - MKR SA COM(MARKET RISK)": ["Dummy data for 23 - Schedule"],
      "C 24.00 - MKR IM(MARKET RISK INTERNAL MODELS)": ["Dummy data for 24 - Schedule"],
      "C 25.00 - CREDIT VALUE ADJUSTMENT RISK": ["Dummy data for 25 - Schedule"],
      "C 32.01 - PRUDENT VALUATION: FAIR-VALUED ASSETS AND LIABILITIES": ["Dummy data for 32.1 - Schedule"],
      "C 32.02 - PRUDENT VALUATION: CORE APPROACH": ["Dummy data for 32.2 - Schedule"],
      "C 32.03 - PRUDENT VALUATION: MODEL RISK AVA": ["Dummy data for 32.3 - Schedule"],
      "C 32.04 - PRUDENT VALUATION: CONCENTRATED POSITIONS AVA": ["Dummy data for 32.4 - Schedule"],
      "C 33.00 - GENERAL GOVERNMENTS EXPOSURES BY COUNTRY OF THE COUNTERPARTY": ["Dummy data for 33 - Schedule"],
      "C 35.01 - NPE LC1(NPE LOSS COVERAGE)": ["Dummy data for 35.1 - Schedule"],
      "C 35.02 - NPE LC2(NPE LOSS COVERAGE)": ["Dummy data for 35.2 - Schedule"],
      "C 35.03 - NPE LC3(NPE LOSS COVERAGE)": ["Dummy data for 35.3 - Schedule"],
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
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [warning, setWarning] = useState("");

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
        setArticles(data.articles || []);
        setWarning(data.warning)
        console.log(data);
      });
  }
useEffect(() => {
    if (isInterpreting) {
      setTableData((prevData) => [
        ...prevData,
        { 
          returnId: selectedReturn, 
          schedule: selectedSchedule, // Join articles with newline
          item: selectedItem,
          articles: articles,
          interpretation: interpretation,
          warning : warning
        },
      ]);
      setIsInterpreting(false);
      setIsLoading(false);
    }
  }, [interpretation,articles,warning]);
  // When Return is selected, auto-update Schedule & Item
  const handleReturnChange = (event) => {
    const newReturn = event.target.value;
    setSelectedReturn(newReturn);

    
      setSelectedSchedule("");
      setSelectedItem("");
    
  };

  // When Schedule is selected, auto-update Item
  const handleScheduleChange = (event) => {
    const newSchedule = event.target.value;
    setSelectedSchedule(newSchedule);

    if (selectedReturn && newSchedule) {
     
      setSelectedItem("");
    }
  };

 // Handle Table Update
  // Handle Table Update
  const handlePerformInterpretation = async () => {
    if (selectedReturn && selectedSchedule && selectedItem) {
      setIsInterpreting(true);
      setIsLoading(true); // Start loading
      await getInterpretation(selectedItem);
    }
  };
  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="bank-name"><img src="https://www.hsbc.co.in/content/dam/hsbc/in/images/01_HSBC_MASTERBRAND_LOGO_RGB.svg" alt="HSBC India Bank" /></div>
        
      </div>

      {/* Main</div> Content */}
      <div className="main">
        <h2 className="header">PRA Rulebook</h2>

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
        {isLoading ? (
          <div className="loading">Generating Interpretation...</div>
        )  : (<table className="data-table">
          <thead>
            <tr>
              <th className = "title" >Title</th>
              <th className = "schedule">Schedule</th>
              <th className = "item">Item</th>
              <th className = "articles-h">Articles</th>
              <th className = "interpretation-h ">Interpretation</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index}>
                  <td className="title">{row.returnId}</td>
                  <td className="schedule">{row.schedule}</td>
                  <td className="item">{row.item}</td>
                  <td className="articles">{row.articles}</td>
                  <td className="interpretation"><tr className="interpretation-content">{row.interpretation}</tr><tr className="warning" >{row.warning}</tr></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data selected yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
        
      </div>
    </div>
  );
}

export default App;
