import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import backArrow from "assets/icons/back-arrow.svg";
import { FEED } from "../../templates/RouteWithSubRoutes";
import {
  StyledWizardNav,
  BackButton,
  BackText,
} from "components/StepWizard/WizardNav";
import { useHistory } from "react-router-dom";
import StepWizard from "react-step-wizard";
import SvgIcon from "components/Icon/SvgIcon";
import { mq } from "constants/theme";
import GTM from "constants/gtm-tags";
const desktopBreakpoint = mq.tablet.narrow.maxWidth;

export const StyledButtonWizard = styled(StepWizard)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10rem;
  margin: 0 auto 1rem;
  width: 25rem;
  max-width: 100%;
  & + div {
    display: flex;
    flex-flow: row wrap;
    max-height: calc(100% - 8rem); /* align-items: stretch; */

    & > div {
      min-height: 100%;
    }
  }

  @media screen and (min-width: ${desktopBreakpoint}) {
    width: 50rem;
  }

  @media only screen and (max-width: ${mq.phone.narrow.maxWidth}) {
    padding-left: 7rem;
  }
`;

const WizardFormNav = ({ gtmPrefix = "" }) => {
  const history = useHistory();
  console.log(history);
  const { t } = useTranslation();
  // expandable with paginated paths to keep scroll level
  const fromPath = ["dashboard", "feed"];
  const fullPath = (from, pathname) => from.slice(from.indexOf(pathname) - 1);
  const [isBrowserBackClicked, setBrowserBackClicked] = useState(false);

  useEffect(() => {
    console.log("in use effect");
    const { state, pathname } = history.location;
    console.log(state, pathname);
    console.log("history before push", history);
    history.push(pathname, {
      ...state,
      keepScroll: true,
    });
    console.log("history after push", history);
    window.addEventListener("popstate", onBrowserBack);
    return () => {
      window.removeEventListener("popstate", onBrowserBack);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onBrowserBack = (e) => {
    e.preventDefault();
    const { state } = history.location;
    if (!isBrowserBackClicked && state) {
      setBrowserBackClicked(true);
      if (typeof state.from !== "object") {
        const toPath = fromPath
          .filter((path) => state.from.indexOf(path) > -1)
          .toString();
        if (toPath) {
          history.push(fullPath(state.from, toPath), {
            ...state,
            keepScroll: true,
          });
        } else {
          history.goBack();
        }
      } else {
        history.push(FEED);
      }
    } else {
      setBrowserBackClicked(false);
    }
  };

  const handleClick = () => {
    console.log(history);
    if (history?.location?.state?.from) {
      const { state } = history.location;
      if (typeof state.from !== "object") {
        console.log(fromPath, history.location);
        const toPath = fromPath
          .filter((path) => state.from.indexOf(path) > -1)
          .toString();
        console.log(toPath, history.location);
        if (toPath) {
          console.log("inside toPath", history);
          history.push(fullPath(state.from, toPath), {
            ...state,
            keepScroll: true,
          });
          console.log("history after push", history);
        } else {
          console.log("in go back else", history.location);
          history.goBack();
        }
      } else {
        console.log("in first history push else", history.location);
        history.push(FEED);
      }
    } else {
      console.log("in last history push else", history.location);
      history.push(FEED);
    }
  };

  return (
    <StyledWizardNav>
      <BackButton onClick={handleClick} id={gtmPrefix + GTM.wizardNav.back}>
        <SvgIcon src={backArrow} title="Navigate to previous page or feed" />
        <BackText>{t("onboarding.common.previous")}</BackText>
      </BackButton>
    </StyledWizardNav>
  );
};

export default WizardFormNav;
