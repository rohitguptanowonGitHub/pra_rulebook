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
        "0%",
        "2%",
        "4%","10%","20%","35%","50%","70%","75%","100%","150%","250%","370%",
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
  const [articles, setArticles] = useState("");
  const [articlesTitle, setArticlesTitle] = useState("");
  const [qnalist, setQnalist] = useState("");
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
        setArticles(data.articles);
        setWarning(data.warning);
        setArticlesTitle(data.additional_articles);
        setQnalist(data.qna_refs);
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
          warning : warning,
          qna : qnalist,
          articlestitle : articlesTitle,
        },
      ]);
      setIsInterpreting(false);
      setIsLoading(false);
    }
  }, [interpretation,articles,warning, qnalist, articlesTitle ]);
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
        <div className="bank-name"><svg width="92" height="100" viewBox="0 0 92 100" fill="none"> 
        <g clipPath="url(#clip0_1_2)">
        <path d="M80.5276 0L19.8341 22.1511L80.5276 11.4305V0Z" fill="#ffe600"></path>
        <path d="M29.572 49.9334H40.673V43.4875H29.572V38.4211H41.8524L37.7779 31.3598H20.3641V62.0601H44.9238V54.9988H29.5711V49.9334H29.572ZM61.2704 31.3607L56.0551 41.3795L50.8528 31.3607H40.673L51.3993 49.9343V62.0611H60.5788V49.9343L71.3197 31.3607H61.2704ZM71.519 96.4482C71.519 96.664 71.5043 96.9368 71.4905 97.0379H67.3784C67.4501 97.9867 68.0976 98.3752 68.8306 98.3752C69.2623 98.3752 69.6646 98.2457 70.0099 97.9003L71.2177 98.9208C70.5849 99.7116 69.6214 99.9991 68.7589 99.9991C66.775 99.9991 65.6388 98.4753 65.6388 96.4767C65.6388 94.3054 66.9761 92.9249 68.6441 92.9249C70.4269 92.9249 71.5199 94.4918 71.5199 96.4473L71.519 96.4482ZM67.4069 95.7153H69.8225C69.7647 94.9529 69.276 94.4358 68.5862 94.4358C67.7669 94.4358 67.4501 95.155 67.4069 95.7153ZM91.85 96.4482C91.85 96.664 91.8353 96.9368 91.8215 97.0379H87.7094C87.781 97.9867 88.4286 98.3752 89.1616 98.3752C89.5932 98.3752 89.9956 98.2457 90.3409 97.9003L91.5487 98.9208C90.9159 99.7116 89.9524 99.9991 89.0899 99.9991C87.106 99.9991 85.9698 98.4753 85.9698 96.4767C85.9698 94.3054 87.3071 92.9249 88.9751 92.9249C90.7579 92.9249 91.8509 94.4918 91.8509 96.4473L91.85 96.4482ZM87.7379 95.7153H90.1535C90.0957 94.9529 89.607 94.4358 88.9172 94.4358C88.0979 94.4358 87.781 95.155 87.7379 95.7153ZM84.3155 97.4402L85.437 98.5038C84.8621 99.2367 84.0712 99.9991 82.7339 99.9991C80.8794 99.9991 79.5127 98.5185 79.5127 96.4767C79.5127 94.6076 80.6489 92.9249 82.7624 92.9249C83.9702 92.9249 84.8042 93.4714 85.4223 94.3917L84.2724 95.5564C83.8701 95.0246 83.4384 94.6076 82.7486 94.6076C81.8136 94.6076 81.3249 95.3984 81.3249 96.4482C81.3249 97.4255 81.7566 98.3026 82.7624 98.3026C83.3805 98.3026 83.8985 97.972 84.3155 97.4402ZM68.6717 86.1676H67.0037V85.6928C66.6298 86.1097 66.0264 86.3109 65.422 86.3109C63.6677 86.3109 63.0063 85.0452 63.0063 83.2193V79.38H64.7028V83.0751C64.7028 83.9954 64.8902 84.6852 65.839 84.6852C66.7878 84.6852 66.9752 83.966 66.9752 83.132V79.3791H68.6717V86.1658V86.1676ZM73.9631 84.1837L73.7188 85.9095C73.3735 86.1823 72.7415 86.3118 72.3245 86.3118C71.2894 86.3118 70.4839 85.5357 70.4839 84.2985V81.0057H69.5066V79.3809H70.4839V77.6128L72.1803 76.7504V79.3818H73.7905V81.0066H72.1803V83.8539C72.1803 84.4436 72.4246 84.6595 72.8416 84.6595C73.2586 84.6595 73.6903 84.4436 73.9631 84.1846V84.1837ZM48.1965 86.1676H46.5V82.4725C46.5 81.5522 46.2988 80.8762 45.35 80.8762C44.4012 80.8762 44.1854 81.4944 44.1854 82.4294V86.1676H42.4889V77.6128L44.1854 76.7504V79.8558C44.5592 79.482 45.0194 79.2376 45.7817 79.2376C47.5792 79.2376 48.1974 80.6181 48.1974 82.343V86.1676H48.1965ZM78.4776 99.8558H76.7232V96.1607C76.7232 95.2119 76.5074 94.5791 75.5586 94.5791C74.6667 94.5791 74.3792 95.1109 74.3792 96.1175V99.8558H72.6249V93.0691H74.3792V93.5293C74.7383 93.1701 75.2711 92.9258 76.0325 92.9258C77.8732 92.9258 78.4766 94.3495 78.4766 96.0174V99.8567L78.4776 99.8558ZM56.5364 92.4804C57.0976 92.4804 57.5431 92.0349 57.5431 91.4737C57.5431 90.9125 57.0976 90.467 56.5364 90.467C55.9752 90.467 55.5298 90.9125 55.5298 91.4737C55.5298 92.0349 55.9752 92.4804 56.5364 92.4804ZM11.7044 92.4804C12.2656 92.4804 12.7111 92.0349 12.7111 91.4737C12.7111 90.9125 12.2656 90.467 11.7044 90.467C11.1432 90.467 10.6978 90.9125 10.6978 91.4737C10.6978 92.0349 11.1432 92.4804 11.7044 92.4804ZM91.85 82.76C91.85 82.9759 91.8353 83.2487 91.8215 83.3497H87.7094C87.781 84.2985 88.4286 84.687 89.1616 84.687C89.5932 84.687 89.9956 84.5575 90.3409 84.2122L91.5487 85.2326C90.9159 86.0234 89.9524 86.3109 89.0899 86.3109C87.106 86.3109 85.9698 84.7871 85.9698 82.7885C85.9698 80.6172 87.3071 79.2367 88.9751 79.2367C90.7579 79.2367 91.8509 80.8037 91.8509 82.7591L91.85 82.76ZM87.7379 82.0271H90.1535C90.0957 81.2647 89.607 80.7476 88.9172 80.7476C88.0979 80.7476 87.781 81.4668 87.7379 82.0271ZM80.4193 86.1676H78.7513V85.6928C78.3774 86.1097 77.774 86.3109 77.1696 86.3109C75.4153 86.3109 74.754 85.0452 74.754 83.2193V79.38H76.4504V83.0751C76.4504 83.9954 76.6378 84.6852 77.5866 84.6852C78.5354 84.6852 78.7228 83.966 78.7228 83.132V79.3791H80.4193V86.1658V86.1676ZM54.9401 82.76C54.9401 82.9759 54.9254 83.2487 54.9116 83.3497H50.7995C50.8711 84.2985 51.5187 84.687 52.2516 84.687C52.6833 84.687 53.0856 84.5575 53.431 84.2122L54.6388 85.2326C54.006 86.0234 53.0425 86.3109 52.18 86.3109C50.196 86.3109 49.0598 84.7871 49.0598 82.7885C49.0598 80.6172 50.3972 79.2367 52.0652 79.2367C53.848 79.2367 54.941 80.8037 54.941 82.7591L54.9401 82.76ZM50.828 82.0271H53.2436C53.1857 81.2647 52.6971 80.7476 52.0073 80.7476C51.188 80.7476 50.8711 81.4668 50.828 82.0271ZM64.588 99.8558H62.8337V99.4103C62.2587 99.8273 61.9133 100 61.2952 100C59.3397 100 58.5057 98.3035 58.5057 96.405C58.5057 94.3485 59.483 92.9258 61.252 92.9258C61.8417 92.9258 62.402 93.0838 62.8337 93.4723V91.301L64.588 90.4239V99.8558ZM62.8346 97.757V95.1688C62.4608 94.7665 62.1016 94.5791 61.6121 94.5791C60.5916 94.5791 60.3464 95.3846 60.3464 96.3472C60.3464 97.4402 60.6623 98.3458 61.6552 98.3458C62.1439 98.3458 62.4892 98.1299 62.8346 97.7561V97.757ZM55.6446 93.0691V99.8558H57.3989V93.0691H55.6446ZM54.6241 90.6544V92.0634C54.3651 91.977 54.0207 91.9339 53.7616 91.9339C53.2583 91.9339 53.0287 92.0918 53.0287 92.5235V93.07H54.4808V94.7095H53.0287V99.8567H51.2743V94.7095H50.3255V93.07H51.2743V92.2507C51.2743 90.9851 52.0652 90.468 53.3446 90.468C53.7185 90.468 54.265 90.5111 54.6241 90.6553V90.6544ZM49.4621 99.8558H47.7078V96.1607C47.7078 95.2119 47.492 94.5791 46.5432 94.5791C45.6513 94.5791 45.3638 95.1109 45.3638 96.1175V99.8558H43.6095V93.0691H45.3638V93.5293C45.7229 93.1701 46.2557 92.9258 47.0171 92.9258C48.8578 92.9258 49.4612 94.3495 49.4612 96.0174V99.8567L49.4621 99.8558ZM39.3825 92.9258C37.427 92.9258 36.2045 94.4643 36.2045 96.4629C36.2045 98.5626 37.5419 100 39.3825 100C41.2232 100 42.5605 98.5626 42.5605 96.4629C42.5605 94.3632 41.338 92.9258 39.3825 92.9258ZM39.3825 98.3035C38.261 98.3035 38.0167 97.2252 38.0167 96.4629C38.0167 95.4131 38.4484 94.6085 39.3825 94.6085C40.3166 94.6085 40.7483 95.414 40.7483 96.4629C40.7483 97.2252 40.504 98.3035 39.3825 98.3035ZM34.508 97.4402L35.6295 98.5038C35.0546 99.2367 34.2637 99.9991 32.9264 99.9991C31.0719 99.9991 29.7052 98.5185 29.7052 96.4767C29.7052 94.6076 30.8414 92.9249 32.9549 92.9249C34.1627 92.9249 34.9967 93.4714 35.6148 94.3917L34.4649 95.5564C34.0626 95.0246 33.6309 94.6076 32.9411 94.6076C32.0061 94.6076 31.5174 95.3984 31.5174 96.4482C31.5174 97.4255 31.9491 98.3026 32.9549 98.3026C33.573 98.3026 34.091 97.972 34.508 97.4402ZM25.436 99.8558H23.6817V96.1607C23.6817 95.2119 23.4658 94.5791 22.517 94.5791C21.6252 94.5791 21.3239 95.1109 21.3239 96.1175V99.8558H19.5696V91.301L21.3239 90.4239V93.5293C21.6546 93.127 22.3444 92.9258 23.0204 92.9258C24.8032 92.9258 25.436 94.3348 25.436 96.0174V99.8567V99.8558ZM18.4903 97.814L18.2313 99.5821C17.8722 99.8696 17.0088 99.9991 16.5486 99.9991C15.485 99.9991 14.7226 99.1504 14.7226 97.972V94.7077H13.5433V93.0682H14.7226V91.3001L16.477 90.4229V93.0682H18.4609V94.7077H16.477V97.4971C16.477 98.1153 16.7066 98.3164 17.1236 98.3164C17.5406 98.3164 18.1872 98.1006 18.4894 97.8131L18.4903 97.814ZM10.8273 93.0691V99.8558H12.5816V93.0691H10.8273ZM9.90694 93.0691L7.765 99.8558H6.15487L5.00491 95.729L3.84025 99.8558H2.23012L0.101035 93.0691H2.05652L3.07698 97.0085L4.22694 93.0691H5.82329L6.97325 97.0085L8.0084 93.0691H9.90602H9.90694ZM62.5756 76.98V78.3743C62.187 78.2732 61.9289 78.2301 61.6984 78.2301C61.0949 78.2301 60.9654 78.4459 60.9654 78.7913V79.3809H62.1154V81.0204H60.9654V86.1676H59.269V81.0204H58.435V79.3809H59.269V78.5616C59.269 77.3823 59.8871 76.7789 61.3255 76.7789C61.7857 76.7789 62.1595 76.8652 62.5765 76.98H62.5756ZM41.7118 84.1837L41.4675 85.9095C41.1222 86.1823 40.5187 86.3118 40.1017 86.3118C39.0666 86.3118 38.261 85.5357 38.261 84.2985V81.0057H37.0817V79.3809H38.261V77.6128L39.9575 76.7504V79.3818H41.5392V81.0066H39.9575V83.8539C39.9575 84.4436 40.2018 84.6595 40.6188 84.6595C41.0358 84.6595 41.4381 84.4436 41.7118 84.1846V84.1837ZM33.8183 82.76C33.8183 82.9759 33.8036 83.2487 33.7898 83.3497H29.8209C29.8926 84.2985 30.5539 84.687 31.2878 84.687C31.7195 84.687 32.1071 84.5575 32.4524 84.2122L33.6603 85.2326C33.0991 85.9802 32.0786 86.3109 31.173 86.3109C29.2322 86.3109 28.0813 84.7871 28.0813 82.8023C28.0813 80.8174 29.3323 79.2367 31.1004 79.2367C32.998 79.2367 33.8183 80.9626 33.8183 82.7591V82.76ZM29.8494 82.0271H32.2651C32.1934 81.2647 31.747 80.7476 31.0141 80.7476C30.2379 80.7476 29.8926 81.4668 29.8494 82.0271ZM27.2758 82.7894C27.2758 84.529 26.5566 86.3118 24.6305 86.3118C23.8828 86.3118 23.4227 86.039 23.1205 85.7506V87.8209L21.424 88.6696V79.3809H23.1205V79.8411C23.566 79.4388 24.0261 79.2376 24.659 79.2376C26.4849 79.2376 27.2758 80.9635 27.2758 82.7894ZM25.5214 82.8748C25.5214 81.8829 25.2624 80.8762 24.242 80.8762C23.7671 80.8762 23.3933 81.0921 23.1205 81.4797V84.068C23.3933 84.4565 23.8534 84.6861 24.343 84.6861C25.2918 84.6861 25.5224 83.8236 25.5224 82.8748H25.5214ZM20.2447 86.1676H18.5482V85.6928C18.1459 86.095 17.6279 86.3109 16.9665 86.3109C15.6292 86.3109 14.5794 85.4484 14.5794 83.9531C14.5794 82.4578 15.5998 81.667 17.2246 81.667C17.6563 81.667 18.1018 81.7249 18.5473 81.9398V81.5807C18.5473 80.9479 18.1303 80.6888 17.3826 80.6888C16.8508 80.6888 16.3475 80.8184 15.8157 81.1343L15.1396 79.9265C15.8726 79.4663 16.5771 79.2367 17.4836 79.2367C19.1948 79.2367 20.2447 80.0707 20.2447 81.6092V86.1667V86.1676ZM18.5482 84.1837V83.3212C18.2028 83.1054 17.7574 83.0337 17.412 83.0337C16.6643 83.0337 16.3052 83.3644 16.3052 83.9109C16.3052 84.4289 16.6359 84.8459 17.2687 84.8459C17.5994 84.8459 18.1744 84.7311 18.5482 84.1846V84.1837ZM13.6452 86.1676H11.9488V82.4725C11.9488 81.5522 11.7476 80.8762 10.7988 80.8762C9.84999 80.8762 9.63415 81.4944 9.63415 82.4294V86.1676H7.93768V77.6128L9.63415 76.7504V79.8558C10.008 79.482 10.4681 79.2376 11.2305 79.2376C13.028 79.2376 13.6462 80.6181 13.6462 82.343V86.1676H13.6452ZM7.00264 83.4507C7.00264 85.4925 5.44946 86.3118 3.60971 86.3118C2.28615 86.3118 0.819302 85.8948 0 84.687L1.26569 83.5655C1.85537 84.27 2.70315 84.6007 3.56654 84.6007C4.58699 84.6007 5.17667 84.1405 5.17667 83.4939C5.17667 83.2349 5.07563 82.9759 4.64485 82.7609C4.32889 82.603 3.94037 82.5019 3.17801 82.3155C2.70315 82.2007 1.72586 81.9701 1.12149 81.4815C0.518034 80.9929 0.345356 80.2884 0.345356 79.6702C0.345356 77.758 1.98488 76.9818 3.59501 76.9818C4.98929 76.9818 5.99597 77.5568 6.80149 78.3761L5.5358 79.6124C4.94612 79.0227 4.37114 78.6921 3.47928 78.6921C2.71692 78.6921 2.15664 78.9364 2.15664 79.5692C2.15664 79.842 2.25767 80.0294 2.53047 80.1874C2.84643 80.36 3.29282 80.4895 3.98262 80.6622C4.80192 80.8781 5.56427 81.0645 6.18242 81.5678C6.72893 82.0133 7.00173 82.603 7.00173 83.4517L7.00264 83.4507ZM86.0414 79.6978L85.3489 81.3942C85.0898 81.1499 84.7877 80.9773 84.3716 80.9773C83.5661 80.9773 83.3667 81.6533 83.3667 82.4725V86.1676H81.6703V79.3809H83.3667V79.8558C83.7553 79.4673 84.2439 79.2376 84.7904 79.2376C85.2653 79.2376 85.6823 79.3818 86.0414 79.6978Z" fill="#2e2e38"></path>
        </g>
      <defs>
<clipPath id="clip0_1_2">
<rect width="91.85" height="100" fill="white"></rect>
</clipPath>
</defs>
</svg></div>
        
      </div>

      {/* Main</div> Content */}
      <div className="main">
        <h2 className="header">PRA Rulebook Interpreter</h2>

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
              <th className = "qna-h">EBA QnA Reference</th>
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
                  <td className="articles">
                    <tr><b>Annex 2 Ref : </b></tr>
                    <tr>{row.articles}</tr>
                    
                    <tr><br></br><b>Rulebook Ref  : </b><br></br></tr>
                   
                    <tr>{row.articlestitle}</tr>
                  </td>
                  <td className="qna">{row.qna}</td>
                  <td className="interpretation"><tr className="interpretation-content">{row.interpretation}</tr><br></br><tr className="warning" ><b>Article Reference: </b><em>{row.warning}</em></tr></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data selected yet.</td>
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
