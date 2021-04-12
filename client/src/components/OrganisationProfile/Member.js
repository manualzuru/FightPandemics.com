import React from "react";
import styled from "styled-components";
import { theme } from "constants/theme";
import { getInitialsFromFullName } from "utils/userInfo";

const { colors } = theme;


export const AllApplicants = styled.div`
    max-height: 90px !important;
`;

export const ApplicantContainer = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
margin: .5rem 0;
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);

`;

export const ApplicantPic = styled.div`
display: flex;
align-items: center;
justify-self: flex-start;
justify-content: center;
margin: 1rem 0;
border-radius: 50%;
border: 0.1rem solid ${colors.royalBlue};
color: ${colors.royalBlue};
width: 4rem;
height: 4rem;
text-align: center;
font-size: 1.6rem;
font-weight: 500;
line-height: 2rem;
`;

export const Initials = styled.div`
    font-size: 1.5rem;
`;

export const Name = styled.p`
    color: ${colors.black};
    font-size: 1.6rem;
    line-height: 1.9rem;
    font-weight: 400;
    margin: 0;
    margin-left: 2rem;
`;

// export const TestApplicants = () => {
//     // const names = []
//     return (
//         <AllApplicants>

//             {/* {names.map((names) => { } */}

//                 return (
//             <>
//                 <ApplicantContainer>
//                     <ApplicantPic>
//                         <Initials>{getInitialsFromFullName(names)}</Initials>

//                     </ApplicantPic>
//                     <Name>{names}</Name>
//                 </ApplicantContainer>

//             </>
//                 )
//             })
//             <center style={{ "color": "red" }}>TEST DATA</center>
//         </AllApplicants>
//     )
// }

const Member = ({ members }) => {
    return (
        <AllApplicants>
            <ApplicantContainer>
                <ApplicantPic>
                    <Initials>
                        {getInitialsFromFullName(members.author.name)}
                    </Initials>
                </ApplicantPic>
                <Name>{members.author.name}</Name>
            </ApplicantContainer>
        </AllApplicants>
    )

}

export default Member;