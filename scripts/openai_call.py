from langchain_openai import AzureChatOpenAI
from langchain.schema import SystemMessage
from langchain.chains import LLMChain
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from langchain_community.chat_message_histories import FileChatMessageHistory

openai_api_type_local = "azure"
openai_api_base_local = "https://eygenaistudio-openai-dev.openai.azure.com/"
openai_api_version_local = "2024-05-01-preview"
openai_api_key_local = "07362a79cd45421b99f245cda89c71fb"

my_llm = AzureChatOpenAI(
    deployment_name="gpt-4",
    model_name="gpt-4",
    openai_api_key=openai_api_key_local,
    openai_api_type=openai_api_type_local,
    openai_api_version=openai_api_version_local,
    azure_endpoint=openai_api_base_local
)

#sys_msg = "Extract only the Articles mentioned in the given text as a Python list, without any additional text or explanation. And if no Articles are present then give a blank list with no additional text. Append the word Articles in front if the list item doesnt have it. Also only extract the article which is relevant to 0282 and ignore the text which comes before it."
sys_msg = """You are Subject Matter Expert that helps in creation of an interpretation in the bullet points on the basis of relevant information below.  
Title : Exposures in default subject to a risk weight of 150%, Article : UK CRR Art. 112 (j), 
Question : 1/ For lines 290 and 310, are the columns "215" and "220" matching the exposures’ weighted amounts if they were not secured by a mortgage or is it necessary to declare the same weighted amounts shown in line 010 classified according to the category of the exposure’s original counterpart. 2/ For lines 300 and 320, is the column "215" matching the exposures’ weighted amounts if they were not in default or is it necessary to declare the same weighted amounts shown in line 010 classified according to the category of the
exposure’s original counterpart. 3/ Lines 300 and 320 of the CR SA’ state
concern defaulted exposures for which categories before being in default
were as such: - Central governments and central banks - Regional and local
administrations - Public Sector Entities - Institutions that are not subjected
to an evaluation of short-term credit - Businesses/Corporates that are not the
subjected to an evaluation of short-term credit - Retail (customers ) Can you
confirm that defaulted exposures secured by a mortgage are not affected by
lines 300 and 320 of the CR SA state? However, they will be reported in the
column "020" of the line 90 of the CR GB 1 state.
Final Answer : Rows from 290 to 320 of template C 07.00 of Regulation (EU) No 680/2014
13 ITS on Supervisory Reporting of institutions (ITS) are memorandum items
and affect neither the calculation of the risk weighted exposure amounts of
the exposure classes according to Article 112 points a) to c) and f) to h) of
the Regulation (EU) No. 575/2013 (CRR) nor of the exposure classes
according to Article 112 points i) and j) of CRR reported in CR SA (please see
Annex II, paragraph 55 of the ITS). In addition paragraph 56 points out, that
the memorandum items provide additional information about the obligor
structure of the exposure classes 'in default' and 'secured by immovable
property'. Therefore the figures reported in all the columns of C 07.00 are
filled considering the default status (rows 300 and 320) or immovable
property collateral (rows 290 and 310). It implies that:
1. Question 1 13 with regard to rows 290 and 310, columns 215 and 220
include RWAs calculated according to Article 124 - 126 CRR;
2. Question 2 13 with regard to rows 300 and 320, columns 215 includes
RWAs calculated according to Art. 127 CRR.
With reference to question 3, where an exposure secured by mortgages on a
real estate (commercial or residential) is in default, it is included in rows 300
or 320 of template C 07.00. With regard to the C 09.01 template, according
to the instructions of row 100 of Annex II the original exposure pre
conversion factor linked to a defaulted exposure is reported in cell (r100;
c010) as well as in cell (r090; c020) as clarified in Q&A 2013_347.

The example Interpretation is : This memorandum item is populated for ‘Central governments or central banks’, ‘Regional governments or local authorities’, ‘Public sector entities’, ‘Institutions’, ‘Corporates’, and ‘Retail’ when:

1)  Exposure is default.

2) RW is 150%

"""

content = """
Title : Securities Financing Transactions netting sets
Article : Article 4
Article Definition: The Liquidity Coverage Ratio
The detailed liquidity coverage requirement in accordance with Article
and shall be expressed as a percentage. Credit institutions shall
calculate their liquidity coverage ratio in accordance with the following
formula:
Liquidity Buffer
Net Liquidity Outflows over a 30 calendar day stress period
= Liquidity Coverage Ratio (%)
Credit institutions shall maintain a liquidity coverage ratio of at least
100%.
By derogation from paragr | 2, credit institutions may monetise their
liquid assets to cover their net liquidity outflows during stress periods,
even if such a use of liquid assets may result in their liquidity coverage
ratio falling below 100% during such periods.
Where at any time the liquidity coverage ratio of a credit institution has
fallen or can be reasonably expected to fall below 100%, the requirement
laid down in Arti 14 of CRR shall apply. Until the liquidity coverage
ratio has been restored to the level referred to in paragraph 2, the credit
Credit institutions shall calculate and monitor their liquidity coverage ratio
in the reporting currency for all items, irrespective of their actual
currency denomination.
01/01/2022
01/01/2022In addition, credit institutions shall separately calculate and monitor their
liquidity coverage ratio for certain items as follows:
(a) for items that are subject to separate reporting in a currency other
than the reporting currency in accordance with Article 415(2) of
liquidity coverage ratio in that other currency;
(b) for items denominated in the reporting currency where the
aggregate amount of liabilities denominated in currencies other than
the reporting currency equals or exceeds 5% of the credit
institution's total liabilities, excluding regulatory capital and off-
balance-sheet items, credit institutions shall separately calculate and
monitor their liquidity coverage ratio in the reporting currency
coverage ratio in accordance with Reporting ('
Rulebook.
Credit institutions shall not double-count liquid assets, inflows and
outflows.
[Note: The rule corresponds to Article 4 of Regulation (EU) No 2015/61
as it applied immediately before revocation by the Treasury]
Question : May a PI authorised and operating in an EU Member State use a credit
institution based in a third country (e.g. UK) for the purpose of safeguarding
funds in accordance with Art. 10(1)(a) of PSD2?
Final Answer : Article 10 of PSD2 requires payment institutions (PIs) to safeguard funds
which have been received from the payment service users or through
another payment service provider for the execution of payment transactions,
using one or several of the safeguarding methods set out in that Article.
Article 10(1)(a) of PSD2 refers to funds deposited in a separate account with
a credit institution or invested in secure, liquid low-risk assets, as defined by
the competent authorities of the home Member State.
The term ‘Credit Institution’ as defined in Article 1(a) of PSD2 refers to
Article 4(1)(1) of Regulation (EU) No 575/2013 on prudential requirements
for credit institutions and investment firms (the CRR) “including branches
thereof […] where such branches are located in the Union, whether the head
offices of those branches are located within the Union or, in accordance with
Article 47 of Directive 2013/36/EU and with national law, outside the Union”.
Article 4(1)(1) of CRR defines a credit institution “as an undertaking the
business of which is to: (a) take deposits or other repayable funds from the
public and to grant credits for its own account […]”.
This definition applies to institutions authorised to operate within the EEA.
As highlighted in Directive 2013/36/EU on access to the activity of credit
institutions and the prudential supervision of credit institutions and
investment firms (CRD), in conjunction with Article 14 of Regulation (EU) No
1024/2013, the granting of licences to credit institutions remains in the
remit of the competent national authorities under the ECB’s control and final
responsibility.
It follows from the above that the reference to a ‘credit institution’ in Article
10(1)(a) of PSD2 refers only to credit institutions authorised in the EU/EEA.
and branches that are authorised to operate in the EU/EEA of undertakings
established in a third country as referred to in Article 47 Directive
2013/36/EU.
Disclaimer: The answer clarifies provisions already contained in the
applicable legislation. They do not extend in any way the rights and
obligations deriving from such legislation nor do they introduce any
additional requirements for the concerned operators and competent
authorities. The answers are merely intended to assist natural or legal
persons, including competent authorities and Union institutions and bodies
in clarifying the application or implementation of the relevant legal
provisions. Only the Court of Justice of the European Union is competent to
authoritatively interpret Union law. The views expressed in the internal
Commission Decision cannot prejudge the position that the European
Commission might take before the Union and national courts.
13 of 34Answer prepared by Answer prepared by the European Commission because it is a matter of
interpretation of Union law.
Note to Q&A
Link https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2023_6882

Give the interpretation on the basis of above in sumarized way in bullet points each point shouldn't be .
"""

my_prompt = ChatPromptTemplate(
    input_variables=['content'],
    messages=[
        SystemMessage(content=sys_msg),
        #MessagesPlaceholder(variable_name='chat_history'), # Where the memory will be stored.
        HumanMessagePromptTemplate.from_template('{content}')
    ]
)

chain = LLMChain(
    llm=my_llm,
    prompt=my_prompt,
    #memory=my_memory,
    verbose=False
)
class LLMChatClient:
    def __init__(self, llm, prompt, content, verbose=False):
        self.llm = llm
        self.prompt = prompt
        self.verbose = verbose
        self.content = content

    def get_response(self):
        response = chain.invoke({'content': self.content})
        return response["text"]


# Usage

llm = my_llm
prompt = my_prompt
client = LLMChatClient(llm, prompt, content)
response = client.get_response()
print(response)