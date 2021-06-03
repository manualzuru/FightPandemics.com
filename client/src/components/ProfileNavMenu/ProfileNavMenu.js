import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled,  { css } from "styled-components";
import { theme, mq } from "constants/theme";
const { colors } = theme;
const mobileMediaQuery = window.matchMedia(mq.phone.wide.max); 
const navbarHeight =  mobileMediaQuery.matches? "5rem" : "6rem";
const leftContainerWidth = "9.5rem";

const Arrow = () => {
    return (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="path1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path className="path2" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
}

const ArrowWrapper = styled.div`
    margin-bottom: 2.2rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #B8C2F8;
    }

    .path1 {
        d: ${props => props.navIsOpened ? 
            'path("M10.009 7.3125 L5.00903 12.3125 L10.009 17.3125")'
            :
            'path("M10.009 7.3125 L15.01803 12.3125 L10.009 17.3125")'
        };
        transition: all 0.3s ease;
    }

    .path2 {
        d: ${props => props.navIsOpened ? 
            'path("M17.009 7.3125 L12.009 12.3125 L17.009 17.3125")'
            :
            'path("M17.009 7.3125 L22.01803 12.3125 L17.009 17.3125")'
        };
        transition: all 0.3s ease;
    }

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        display: none;
    }
`;

const AddOrganizationBtn = styled.button`
    border: none;
    border-radius: 50%;
    font-size: 3.424rem;
    padding: 0 1rem;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #B8C2F8;
    }
`;

const NavMenu = styled.div`
    width: ${props => props.navIsOpened ? "30rem" : "10rem"};
    height: calc(100vh - ${navbarHeight});
    position: fixed;
    z-index: 999;
    top: ${navbarHeight};
    background-color: #F6F7FB;
    display: flex;
    overflow: hidden;
    transition: width 0.1s ease-in-out;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        display: ${props => props.navIsOpened ? "initial" : "none"};
        width: 100vw;
        background-color: ${colors.white};
      }
`;

const LeftContainer = styled.div`
    width: ${leftContainerWidth};
    height: 100%;
    padding: 2.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        display: none;
        margin: 0 auto;
        width: 94vw;
        height: auto;
        padding: 0 2.2rem;
        box-shadow: 0.1rem 0rem 1rem 0.4rem #ddd;
        border-radius: 1rem;
      }
`;

const RightContainer = styled.div`
    width: calc(100% - ${leftContainerWidth});
    height: 100%;
    padding-top: 7.6rem;
    padding-left: 0.7rem;
    position:relative;
    opacity: ${props => props.navIsOpened ? "1" : "0"};
    transition: opacity 1.2s ease-in-out;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        padding-top: 7.6rem;
        display: block;
        width: 100vw;
        height: auto;
        opacity: 1;
        text-align: center;
      }
`;

const OrgImage  = styled.img`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    margin-bottom: 2.5rem;
    cursor: pointer;
`;

const OrgTitle = styled.h2`
    color: ${theme.colors.royalBlue};
    margin-top: 0;
    font-size: 2.4rem;
    font-weight: 600;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        display: none;
      }
`;

const OrgAccessLevelTitle = styled.h2`
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 400;
    margin-top: 1.9rem;
    margin-bottom: 0;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        position: initial;
        display: ${props => props.id === "Org Work Space" ? "none" : "initial"}
      }
`;

const NavLink = styled(Link)`
    display: block;
    font-size: 1.4rem;
    line-height: 2rem;
    
    &:hover {
        color: ${theme.colors.royalBlue};
    }
`;

const Footer = styled.footer`
    position: absolute;
    left: 0.7rem;
    bottom: 2.138rem;

    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        display: none;
      }
`;

const OrganizationMobileHeader = styled.div`
    margin: 0 auto;
    width: 94%;
    height: 11.8rem;
    border-radius: 1rem;

    @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
        display: none;
    }
`;

const OrganizationMobileHeaderTop = styled.div`
    width: 100%;
    height: 5.9rem;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    background-color: ${colors.royalBlue};
    padding: 0 2.2rem;
    display: flex;
    align-items: center;
`;
const OrganizationMobileHeaderBottom = styled.div`
    width: 100%;
    height: 5.9rem;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem; 
    display: flex;
    justify-content: center;
    align-items: center; 
    box-shadow: 0.1rem 0.3rem 1rem -0.09rem #ddd;
`;

const OrgImageMobile = styled(OrgImage)`
    width: 4rem;
    height: 4rem;
    margin-bottom: 0;
    margin-right: 0.8rem;
`;

const OrgTitleMobile = styled.span`
    color: ${colors.white};
    margin-top: 0;
    font-size: 1.8rem;
    font-weight: 600;
`;

const OrgServices = styled.span`
    color: ${colors.darkGray};
`;

const ProfileNavMenu = ({navIsOpened, setNavIsOpened}) => {
    const [organizationId, setOrganisationId] = useState(0);
    // This array will be the organizations array (dummy data for now)
    let organisations = ["Cards for Humanity", "Doing Good", "Hearts for LA",
     "Fight it Peters", "Helping Hands", "FightPandemics"]; 

    return (
    <NavMenu navIsOpened = {navIsOpened}>
        <LeftContainer>
            <ArrowWrapper onClick = {() => setNavIsOpened(!navIsOpened)} navIsOpened = {navIsOpened}>
                <Arrow />
            </ArrowWrapper>
            {
             organisations.map((item, idx) => {
                    return (
                        <OrgImage 
                            key= {idx}
                            src ="https://data.whicdn.com/images/22345458/original.jpg" 
                            onClick = {() => {
                                setNavIsOpened(true);
                                setOrganisationId(idx);
                            } }
                        />
                    );
                })
            }
             <AddOrganizationBtn type="button"><span>+</span></AddOrganizationBtn>
        </LeftContainer>
        <OrganizationMobileHeader>
            <OrganizationMobileHeaderTop>
                 <OrgImageMobile 
                    src ="https://data.whicdn.com/images/22345458/original.jpg" 
                />
                <OrgTitleMobile>Fight It Peters</OrgTitleMobile>
            </OrganizationMobileHeaderTop>
            <OrganizationMobileHeaderBottom>
                <OrgServices>Emergency Relief / International Assistance</OrgServices>
            </OrganizationMobileHeaderBottom>
        </OrganizationMobileHeader>
        <RightContainer navIsOpened = {navIsOpened}>
            <OrgTitle>{ organisations[organizationId].length <= 11 
            ? organisations[organizationId] 
            : organisations[organizationId].slice(0, 12) + "..."}</OrgTitle>
            {renderNavSections()}
            <Footer>
                <NavLink>Account</NavLink>
                <NavLink>Profile</NavLink>
                <NavLink>Privacy/Security</NavLink>
                <NavLink>Notifications</NavLink>
            </Footer>
        </RightContainer>
    </NavMenu>
    );
}

function renderNavSections() {
    const orgAccessLevels = {
        "Org Workspace": 
        ["About", "Activity", "Posts", "Org Book", "Members", "Gallery"],
        "Org Admin": 
        ["Applications", "Messages", "Questionnaire", "Positions", "Thanks", "Minting Badges", "Manage Badges"]
    };

    const navSections = [];
    for (let title in orgAccessLevels){
        const links = orgAccessLevels[title];
        const NavSection = styled.nav`
        margin-bottom: 2.3rem;
        `;
        
        const navSectionComponent = 
        <NavSection key = {title}>
            <OrgAccessLevelTitle id={title}> 
                {mobileMediaQuery.matches && title === "Org Admin" ? "ADMIN" : title}
             </OrgAccessLevelTitle>
            {links.map((link, idx) => {
                return <NavLink to="/about-us" key = {link}> {link} </NavLink>;
            })}
        </NavSection>
        navSections.push(navSectionComponent);
    }
    return navSections;
}

export default ProfileNavMenu;