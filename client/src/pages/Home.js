import React from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";

import ImageButton from "components/Button/ImageButton";
import { theme, mq } from "constants/theme";
import TextLabel from "components/Typography/TextLabel";
import GTM from "constants/gtm-tags";
import WithSummitBanner from "components/WithSummitBanner";
import CloudLanding from "assets/home-cloud.gif";
import FPCity from "assets/homecity.png";
import DataTestIds from "utils/constants";

const { typography } = theme;
const { black, royalBlue, white, offWhite } = theme.colors;

const needHelpInactive = require("assets/request-help-unselected.svg");
const needHelpActive = require("assets/request-help-selected.svg");
const offerHelpInactive = require("assets/offer-help-unselected.svg");
const offerHelpActive = require("assets/offer-help-selected.svg");

const FlexChild = styled.div`
  flex-grow: 1;
  margin-bottom: 2rem;
`;

const StyledIntro = styled.div`
  @media screen and ${mq.phone.wide.max} {
    margin-top: 4rem;
  }

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    background-image: url("${CloudLanding}"), ${theme.backgrounds.primary};
    background-repeat: no-repeat;
    background-position: top right;
    background-size: 35rem, cover;
    border-radius: 0.3rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 17rem 7rem 16rem 5rem;
    transition: all 0.3s ease;
  }

  @media only screen and ${mq.desktop.medium.minWidth} {
    padding: 20rem 7rem 20rem 5rem;
  }
`;

export const Title = styled(TextLabel)`
  display: none;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: block;
  }
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  @media only screen and ${mq.tablet.narrow.min} {
    background-color: ${offWhite};
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .city-gif-container {
    position: absolute;
    bottom: 0;
    left: 0;

    &.with-banner {
      bottom: 4rem;

      @media only screen and ${mq.tablet.narrow.max} {
        bottom: 2rem;
      }
    }

    .city-gif {
      width: 58vw;
      position: relative;
      left: 9rem;
    }

    &::after {
      content: " ";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      background: #2947f0;
      width: 100vw;
      height: 1.284vw;
    }

    @media only screen and ${mq.phone.wide.max} {
      display: none;
    }
  }

  @media only screen and ${mq.phone.wide.max} {
    display: block;
  }
`;

const StyledWelcome = styled.h1`
  text-align: left;
  margin: 0 0 7rem 0;
  font-family: ${typography.font.family.display}, sans-serif;
  font-style: normal;

  @media only screen and ${mq.phone.wide.max} {
    font-size: ${typography.size.xlarge};
    margin: 2.5rem auto;
    font-weight: bold;
    text-align: center;
    color: ${black};
  }

  @media only screen and (min-width: ${mq.tablet.wide.minWidth}) {
    font-size: ${typography.heading.one};
  }

  @media only screen and (min-width: ${mq.desktop.small.minWidth}) {
    font-size: 5rem;
  }

  @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
    font-size: 6rem;
  }
`;

const StyledStrapline = styled(StyledWelcome)`
  color: ${white};
  width: 80%;
  text-align: left;
  font-weight: bolder;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  font-size: ${typography.heading.one};
  @media only screen and ${mq.phone.narrow.max} {
    text-align: center;
    margin: 0 auto 1.5rem auto;
    color: ${black};
    font-size: ${typography.size.xlarge};
  }
`;

const IntroText = styled.div`
  color: ${white};
  text-align: left;
  @media only screen and (min-width: ${mq.desktop.small.minWidth}) {
    width: 90%;
  }
`;

const StyledP = styled.p`
  font-size: ${typography.size.xsmall};
  text-align: left;
  color: ${white};
  margin: 0.5rem 0;

  @media only screen and ${mq.phone.wide.max} {
    font-family: ${typography.font.family.display}, sans-serif;
    font-size: ${typography.size.medium};
    text-align: center;
    color: ${black};
    line-height: 2rem;
    letter-spacing: 0rem;
    margin: 1rem 0;
  }

  @media only screen and (min-width: ${mq.tablet.wide.minWidth}) {
    font-size: ${typography.size.large};
  }

  @media only screen and (min-width: ${mq.desktop.small.minWidth}) {
    font-size: ${typography.size.xlarge};
  }

  @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
    font-size: ${typography.size.xxlarge};
  }
`;

const OnboardingContainer = styled.div`
  width: 100%;
  margin: auto 0;

  @media only screen and ${mq.phone.wide.max} {
    margin-top: 6rem;
  }
`;

const StyleLink = styled.span`
  color: ${royalBlue};
  font-size: ${typography.size.large};
  font-family: ${typography.font.family.display};
  font-weight: 500;
  margin-top: 4rem;
`;

const Home = (props) => {
  const { t } = useTranslation();

  return (
    <WithSummitBanner>
      {(bannerVisible) => (
        <MainContainer className="text-center home">
          <div
            className={`city-gif-container ${
              bannerVisible ? "with-banner" : ""
            }`}
          >
            <img loading="lazy" src={FPCity} alt="" className="city-gif"></img>
          </div>
          <StyledIntro>
            <IntroText>
              {/* <Title
              color="white"
              size={theme.typography.size.xlarge}
              weight="500"
            >
              FightPandemics
            </Title> */}

              <StyledStrapline
                data-testid={DataTestIds.HOME_HEAD_LINE}
                level={2}
                margin="none"
              >
                {t("headline")}
              </StyledStrapline>
              <Trans
                i18nKey="tagline"
                components={[<StyledP />, <StyledP />]}
              ></Trans>
            </IntroText>
          </StyledIntro>

          <>
            <OnboardingContainer>
              <FlexChild>
                <ImageButton
                  id={GTM.homePage.prefix + GTM.homePage.requestHelp}
                  data-testid={DataTestIds.HOME_NEED_HELP_BUTTON}
                  type="ghost"
                  inactiveImg={needHelpInactive}
                  activeImg={needHelpActive}
                  onClick={() => props.history.push("/need-help")}
                >
                  {t("common.getHelp")}
                </ImageButton>
              </FlexChild>
              <FlexChild>
                <ImageButton
                  id={GTM.homePage.prefix + GTM.homePage.offerHelp}
                  data-testid={DataTestIds.HOME_GIVE_HELP_BUTTON}
                  type="ghost"
                  inactiveImg={offerHelpInactive}
                  activeImg={offerHelpActive}
                  onClick={() => props.history.push("/offer-help")}
                >
                  {t("common.giveHelp")}
                </ImageButton>
              </FlexChild>

              <Link to="/feed" data-testid={DataTestIds.HOME_VIEW_FEED_LINK}>
                <StyleLink id={GTM.homePage.prefix + GTM.homePage.viewCommPost}>
                  {t("common.viewFeed")}
                </StyleLink>
              </Link>
            </OnboardingContainer>
          </>
        </MainContainer>
      )}
    </WithSummitBanner>
  );
};

export default Home;
