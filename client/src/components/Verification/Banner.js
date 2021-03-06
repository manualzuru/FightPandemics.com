import React, { useState, useEffect } from "react";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { selectOrganisationId } from "reducers/session";
import StepModal from "./StepModal";
import steps from "./steps";
import StyledBanner from "./StyledBanner";
import { ReactComponent as Arrow } from "assets/verification/arrow.svg";
import GTM from "constants/gtm-tags";
import TagManager from "react-gtm-module";

function Banner({ gtmPrefix }) {
  const actorOrganisationId = useSelector(selectOrganisationId);
  const [step, setStep] = useState(null);
  const { t } = useTranslation();

  const startVerification = () => {
    setStep("start");
  };

  const cancelVerification = () => {
    setStep(null);
  };

  const getActorQuery = () =>
    actorOrganisationId ? `?actorId=${actorOrganisationId}` : "";

  const getSessionUrl = async () => {
    try {
      const res = await axios.get(`/api/users/verification${getActorQuery()}`);
      return launchInContextSession(res.data.sessionUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const launchInContextSession = (sessionUrl) => {
    setStep(null);
    const veriffFrame = createVeriffFrame({
      url: sessionUrl,
      onEvent: function (msg) {
        switch (msg) {
          case MESSAGES.STARTED:
            //
            break;
          case MESSAGES.CANCELED:
            setStep("cancel");
            break;
          case MESSAGES.FINISHED:
            setStep("finish");
            break;
        }
      },
    });
  };

  const triggerGTMForModelSwitch = (step) => {
    const eventName =
      step === "start"
        ? GTM.profile.verifyPopup
        : step === "cancel"
        ? GTM.profile.cancelVerify
        : step === "finish"
        ? GTM.profile.accountVerified
        : null;
    if (eventName) {
      TagManager.dataLayer({
        dataLayer: {
          event: gtmPrefix + eventName,
        },
      });
    }
    // clear dataLayer
    TagManager.dataLayer({
      dataLayer: {
        event: null,
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      triggerGTMForModelSwitch(step);
    }, 200);
  }, [step]);

  return (
    <>
      <StyledBanner
        id={gtmPrefix + GTM.profile.verifyAccount}
        onClick={() => startVerification()}
      >
        {t("verification.verifyTitle")}
        <p>{t("verification.verifyBody")}</p>
        <Arrow />
      </StyledBanner>
      {step && (
        <StepModal
          step={step}
          gtmPrefix={gtmPrefix}
          header={steps[step]?.header}
          icon={steps[step]?.icon}
          status={steps[step]?.status}
          body={steps[step]?.body}
          actionText={steps[step]?.actionText}
          onNext={
            step === "finish"
              ? () => window.location.reload()
              : step === "start"
              ? getSessionUrl
              : cancelVerification
          }
          onCancel={cancelVerification}
          t={t}
        />
      )}
    </>
  );
}
export default Banner;
