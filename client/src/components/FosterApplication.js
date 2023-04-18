import { useForm } from "react-hook-form";
import React from "react";
import styled from "styled-components";
import { isValidPhoneNumber } from "react-phone-number-input";
import Form from "./Form";
import { ControlledInput, InputLabel } from "./Input";
import PageSections from "./PageSections";
import { FOSTER_AGREEMENT_CONTENT } from "../constants/FOSTER_AGREEMENT";
import { ControlledCheckboxes } from "./Checkboxes";
import { ControlledRadios } from "./Radios";
import { device } from "../utils/useResponsive";
import { Colors } from "./Theme";
import Meetings from "./Meeting";
import doggo from "../images/good-boi.png";
import logo from "../images/logo-inverted.png";
import ApplicationContext from "../contexts/ApplicationContext";
import PassFail from "./PassFail";
import { createApplication, updateApplication } from "../services/application";
import { AuthContext } from "../contexts/AuthContext";
import FOSTER_EVALUATION_INITIAL_MESSAGES from "../constants/FOSTER_EVALUATION_INITIAL_MESSAGES";

const Button = styled.div`
  background: ${(props) => (props.gray ? Colors.gray : Colors.green)};
  font-size: 20px;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  width: fit-content;
  color: white;
  cursor: pointer;
  align-self: ${(props) => props.alignSelf || "unset"};
`;

function FosterApplicationView({ setView, setApplicationData, applicationData, admin }) {
  const personalInfoRef = React.useRef();
  const fosterInfoRef = React.useRef();
  const outsideInfoRef = React.useRef();

  const applicationSections = React.useMemo(
    () => ({
      "Personal Information": personalInfoRef,
      "Foster Information": fosterInfoRef,
      "Outside Information": outsideInfoRef,
    }),
    []
  );

  const { control, watch, handleSubmit, reset } = useForm({
    reValidateMode: "onChange",
  });

  // clean up date if it was fetched (on admin side)
  // if on foster side load stored data if they go back from agreement page
  React.useEffect(() => {
    if (applicationData) {
      // if(!admin)
      //   setView("submitted");
      if (Object.keys(applicationData).length !== 0) {
        applicationData.otherInfo.dogsNeutered = applicationData.otherInfo.dogsNeutered
          ? "Yes"
          : "No";
        applicationData.fosterInfo.permissionToVisit = applicationData.fosterInfo.permissionToVisit
          ? "Yes"
          : "No";
        applicationData.address.zipcode = applicationData.address.zipcode.toString();
        applicationData.reference.yearsKnown = applicationData.reference.yearsKnown.toString();
      }
      reset(applicationData);
    }
  }, [applicationData]);

  const onSubmit = (data) => {
    // move onto agreement page + store data from current form for next page

    setApplicationData(data);
    setView("agreement");
  };

  const onError = (args) => {
    // setView("agreement"); // uncomment this to see the foster agreement w/o filling out the form
  };
  return (
    <PageSections sections={applicationSections}>
      <Form.Container>
        <Form.Title>Foster Application</Form.Title>
        <Form.Section title="Personal Information" ref={personalInfoRef}>
          <Form.SubSection title="Name">
            <ControlledInput
              control={control}
              label="First Name*"
              name="firstName"
              readOnly={admin}
              required
            />
            <ControlledInput
              control={control}
              label="Last Name*"
              name="lastName"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection title="Address">
            <ControlledInput
              control={control}
              label="Street Address*"
              name="address.addressOne"
              readOnly={admin}
              required
            />
            <ControlledInput
              control={control}
              label="Street Address Line 2"
              name="address.addressTwo"
              readOnly={admin}
            />
            <Form.Row>
              <ControlledInput
                control={control}
                label="City*"
                name="address.city"
                readOnly={admin}
                required
              />
              <ControlledInput
                control={control}
                label="State"
                name="address.state"
                readOnly={admin}
                required
              />
            </Form.Row>
            <Form.Row>
              <ControlledInput
                control={control}
                label="Zipcode*"
                name="address.zipcode"
                type="number"
                rules={{
                  minLength: 5,
                  maxLength: 5,
                }}
                readOnly={admin}
                required
              />
              <ControlledInput
                control={control}
                label="Country*"
                name="address.country"
                defaultValue="United States"
                readOnly={admin}
                required
              />
            </Form.Row>
          </Form.SubSection>
          <Form.SubSection title="E-mail">
            <ControlledInput
              control={control}
              label="ex: myname@example.com*"
              name="email"
              rules={{
                pattern:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
              }}
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection title="Date of Birth">
            <ControlledInput
              control={control}
              label="mm-dd-yyyy*"
              name="dateOfBirth"
              rules={{
                maxLength: 10,
                pattern: /(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])-\d{4}/g,
              }}
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>Do you own or rent your home?*</InputLabel>
            <ControlledRadios
              control={control}
              options={["Own", "Rent"]}
              name="homeType"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>
              Landlord&apos;s Name (if you own, just write n/a for first name)*
            </InputLabel>
            <Form.Row>
              <Form.Column>
                <ControlledInput
                  control={control}
                  label="First Name*"
                  name="landlord.firstName"
                  readOnly={admin}
                  required
                />
                <ControlledInput
                  control={control}
                  label="Landlord's Phone Number"
                  name="landlord.phone"
                  rules={{
                    pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, //eslint-disable-line
                    validate: (value) => !value || isValidPhoneNumber(value, "US"),
                  }}
                  readOnly={admin}
                />
              </Form.Column>
              <Form.Column>
                <ControlledInput
                  control={control}
                  label="Last Name"
                  name="landlord.lastName"
                  readOnly={admin}
                />
                <ControlledInput
                  control={control}
                  label="Landlord's Email Address"
                  name="landlord.email"
                  rules={{
                    pattern:
                      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                  }}
                  readOnly={admin}
                />
              </Form.Column>
            </Form.Row>
          </Form.SubSection>
        </Form.Section>

        <Form.Section title="Foster Information" ref={fosterInfoRef}>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Do you have any breed and/or size restrictions where you live. If yes, please list.*"
              numLines={6}
              name="fosterInfo.restrictions"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Where will your foster dog sleep at night?*"
              name="fosterInfo.sleepLocation"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="How many hours are you home a day?*"
              name="fosterInfo.hoursAtHome"
              type="number"
              rules={{ min: 0, max: 24 }}
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Please describe a typical day for your dog while you are away.*"
              numLines={6}
              name="fosterInfo.typicalDay"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Who will be the primary caregiver for this foster dog?*"
              name="fosterInfo.primaryCaregiver"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>
              If you reside with other adults in the household, are they onboard to bring in a
              foster dog?*
            </InputLabel>
            <ControlledRadios
              control={control}
              options={["Yes", "No", "Don't know, haven't asked them"]}
              name="fosterInfo.othersOnboard"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>Do we have permission to do a home visit?*</InputLabel>
            <ControlledRadios
              control={control}
              options={["Yes", "No"]}
              name="fosterInfo.permissionToVisit"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Have you ever fostered a dog before? If so, please describe the experience and include as much detail as possible.*"
              numLines={14}
              name="fosterInfo.pastExperience"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Why do you wish to foster a dog?*"
              numLines={14}
              name="fosterInfo.whyFoster"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>
              The dog you foster will not be made available for adoption until they receive standard
              intake vetting, while includes a wellness exam, rabies and 1 DHPP vaccine for adults,
              and 2 DHPP vaccines for puppies under 4 months. Are you able to make at least a 1
              month commitment to care for your foster dog?*
            </InputLabel>
            <ControlledRadios
              control={control}
              options={["Yes", "No"]}
              name="fosterInfo.oneMonthCommitment"
              readOnly={admin}
              required
              otherOption
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>
              Size of Dog you are willing to foster (please mark all that apply): *
            </InputLabel>
            <ControlledCheckboxes
              control={control}
              name="fosterInfo.sizeOfDog"
              options={["Under 25 lbs", "25-50 lbs", "Over 50 lbs", "Open"]}
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>
              Age of Dog you are willing to foster (please mark all that apply): *
            </InputLabel>
            <ControlledCheckboxes
              control={control}
              name="fosterInfo.ageOfDog"
              required
              options={[
                "Nursing litter/bottle feeders",
                "8 weeks - 6 months",
                "6 months - 1 year",
                "1 - 6 years",
                "6+ years",
                "Open",
              ]}
              readOnly={admin}
            />
          </Form.SubSection>
        </Form.Section>

        <Form.Section title="Outside Information" ref={outsideInfoRef}>
          <Form.SubSection>
            <InputLabel>Please provide a personal reference </InputLabel>
            <Form.Row>
              <Form.Column>
                <ControlledInput
                  control={control}
                  label="First Name*"
                  name="reference.firstName"
                  readOnly={admin}
                  required
                />
                <ControlledInput
                  control={control}
                  label="Reference's Phone Number*"
                  name="reference.phone"
                  rules={{
                    pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, //eslint-disable-line
                    validate: (value) => isValidPhoneNumber(value, "US"),
                  }}
                  readOnly={admin}
                  required
                />
                <ControlledInput
                  control={control}
                  label="Relation*"
                  name="reference.relation"
                  readOnly={admin}
                  required
                />
              </Form.Column>
              <Form.Column>
                <ControlledInput
                  control={control}
                  label="Last Name*"
                  name="reference.lastName"
                  readOnly={admin}
                  required
                />
                <ControlledInput
                  control={control}
                  label="Reference's Email Address*"
                  name="reference.email"
                  rules={{
                    pattern:
                      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                  }}
                  readOnly={admin}
                  required
                />
                <ControlledInput
                  control={control}
                  label="Years Known*"
                  type="number"
                  name="reference.yearsKnown"
                  readOnly={admin}
                  rules={{ min: 0 }}
                  required
                />
              </Form.Column>
            </Form.Row>
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="How did you hear about TAP?*"
              numLines={6}
              name="otherInfo.howDidYouHearAboutTAP"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="If you have any other pets, please list the number, age, types, and any issues they may have with a new dog.*"
              numLines={10}
              name="otherInfo.otherPets"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Are all the dogs in your home up to date on vaccines and in good health?*"
              numLines={10}
              name="otherInfo.dogsHealth"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>If you have other dogs in the home, are they spayed/neutered?*</InputLabel>
            <ControlledRadios
              control={control}
              options={["Yes", "No"]}
              name="otherInfo.dogsNeutered"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Do you have any children? If so, please list the number and their experience with dogs.*"
              numLines={10}
              name="otherInfo.children"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Please describe your living situation. If you rent, please tell us about your arrangement with your landlord pertaining to dogs.*"
              numLines={10}
              name="otherInfo.livingSituation"
              readOnly={admin}
              required
            />
          </Form.SubSection>
        </Form.Section>
        <Form.Actions>
          <div /> {/* Spacer */}
          {/* {applicationData._id !== '0' &&  <Button onClick={handleSubmit(onSubmit, onError)}>Update</Button>} */}
          <Button onClick={handleSubmit(onSubmit, onError)}>Continue</Button>
          {/* <Button onClick={handleSubmit(onSubmit)}>Continue</Button> */}
        </Form.Actions>
      </Form.Container>
    </PageSections>
  );
}

const FosterAgreementContainer = styled.div`
  max-height: 60vh;
  flex: 5;
  overflow-y: scroll;
  ${device.mobile} {
    max-height: 80vh;
  }
`;

const FosterAgreementContent = styled.pre`
  font-family: inherit;
  font-size: 16px;
  white-space: pre-wrap;
`;

const SignatureContainer = styled.div`
  width: 60%;
  margin: auto;
`;

function FosterAgreementView({
  setView,
  applicationData,
  admin,
  curAppId,
  curUserId,
  setCurAppId,
}) {
  // set initial state of application
  const initialFormVals = () => {
    if (!admin) {
      return {};
    }

    // reformat date so that it can be inserted into the form
    const format = (inputDate) =>
      [inputDate.slice(6, 10), inputDate.slice(0, 2), inputDate.slice(3, 5)].join("-");

    const reformatted = format(applicationData.agreement.date);
    return { ...applicationData.agreement, ...{ date: reformatted } };
  };

  const { control, handleSubmit } = useForm({
    defaultValues: initialFormVals(),
  });
  const [showPassDialog, setShowPassDialog] = React.useState(false);
  const [showRejectDialog, setShowRejectDialog] = React.useState(false);
  const { applicationView, setApplicationState, applicationState } =
    React.useContext(ApplicationContext);
  const [promptAssigning, setPromptAssigning] = React.useState(false); // state to show error message if application is not assigned an ambassador

  const onSubmit = (data) => {
    if (admin) {
      return;
    }

    // Cleaning up data for request
    const reqBody = {
      ...applicationData,
      ...{ agreement: data },
      ...{ status: "Step 1: Application", completedActionItems: false },
      ...{ user: curUserId },
    };
    reqBody.otherInfo.dogsNeutered = reqBody.otherInfo.dogsNeutered !== "No";
    reqBody.fosterInfo.permissionToVisit = reqBody.fosterInfo.permissionToVisit !== "No";
    reqBody.address.zipcode = parseInt(reqBody.address.zipcode, 10);
    reqBody.reference.yearsKnown = parseInt(reqBody.reference.yearsKnown, 10);
    const format = (inputDate) =>
      [inputDate.slice(5, 7), inputDate.slice(8, 10), inputDate.slice(0, 4)].join("/");
    reqBody.agreement.date = format(reqBody.agreement.date);

    if (curAppId) {
      // application already created in this instance, so update it
      updateApplication(curAppId, reqBody).then((response) => {
        console.log("updating"); // uncomment to see status of update app request
        console.log(response.ok); // uncomment to see status of update app request
        setView("done");
      });
    } else {
      // make a new application
      console.log(reqBody);
      createApplication(reqBody).then((response) => {
        console.log(response.ok); // uncomment to see status of create app request
        setCurAppId(response.data.application._id);
        setView("done");
      });
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  const onPassConfirm = React.useCallback((content) => {
    const reqBody = {
      messages: {
        stage1: content,
      },
      status: "Step 2: Initial Interview",
    };
    updateApplication(curAppId, reqBody).then((response) =>
      setApplicationState(response.data.application)
    );
  }, []);

  const onRejectConfirm = React.useCallback((content) => {
    const reqBody = {
      status: "rejected",
      messages: {
        stage1: content,
      },
    };
    updateApplication(curAppId, reqBody).then((response) =>
      setApplicationState(response.data.application)
    );
  }, []);

  return (
    <FosterAgreementContainer>
      <Form.Container>
        <Form.Title>Foster Agreement</Form.Title>
        <FosterAgreementContent>{FOSTER_AGREEMENT_CONTENT}</FosterAgreementContent>
        <SignatureContainer>
          <Form.SubSection>
            <ControlledInput
              control={control}
              name="name"
              label="Print your name"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              name="date"
              label="Date"
              type="date"
              readOnly={admin}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              name="signature"
              label="Signature"
              readOnly={admin}
              required
            />
          </Form.SubSection>
        </SignatureContainer>
        <Form.Actions>
          <Button onClick={() => setView("application")}>Back</Button>
          {applicationView === "user" ? (
            <Button onClick={handleSubmit(onSubmit, onError)}>
              {curAppId ? "Update Application" : "Submit Application"}
            </Button>
          ) : (
            <>
              <Button onClick={() => setShowRejectDialog(true)} gray>
                Reject
              </Button>
              <Button
                onClick={() => {
                  console.log(applicationState.ambassador);
                  if (applicationState.ambassador !== undefined) {
                    setShowPassDialog(true);
                  } else {
                    setPromptAssigning(true); // instantiate error message asking admin to assign ambassador
                  }
                }}
              >
                Pass
              </Button>
            </>
          )}
          <div /> {/* Spacer */}
        </Form.Actions>
        {admin && promptAssigning && (
          <div style={{ marginTop: "10px", color: "red", textAlign: "center" }}>
            Please assign an ambassador to this application before attempting to pass it.
          </div>
        )}
      </Form.Container>
      <PassFail
        visible={showPassDialog}
        setVisible={setShowPassDialog}
        status="Pass"
        initialMessage={FOSTER_EVALUATION_INITIAL_MESSAGES.FOSTER_APPLICATION.PASS}
        onConfirm={onPassConfirm}
      />
      <PassFail
        visible={showRejectDialog}
        setVisible={setShowRejectDialog}
        status="Reject"
        initialMessage={FOSTER_EVALUATION_INITIAL_MESSAGES.FOSTER_APPLICATION.REJECT}
        onConfirm={onRejectConfirm}
      />
    </FosterAgreementContainer>
  );
}

function ApplicationSubmittedView() {
  const { applicationState } = React.useContext(ApplicationContext);

  return (
    <Meetings
      textCard={
        <div>
          <p>Hello, {applicationState?.firstName}</p>
          <p>Thank you so much for showing interest in volunteering to foster with us.</p>
          <p>
            Your application has been received and is under review! Hang tight, you will receive a
            notification when we&apos;re ready!
          </p>
          <p>Best,</p>
          <p>The Animal Pad Team</p>
          <img src={logo} alt="logo" />
        </div>
      }
      imagePath={doggo}
    />
  );
}

function FosterApplication() {
  const { currentUser } = React.useContext(AuthContext);
  const { applicationState, setApplicationState, applicationId, setApplicationId, currentStep } =
    React.useContext(ApplicationContext);
  const [view, setView] = React.useState("application");
  // only render content if the role is foster or application from id is loaded
  if (view === "application")
    return (
      (applicationState || currentUser.type === "user") && (
        <FosterApplicationView
          setView={setView}
          applicationData={applicationState}
          setApplicationData={setApplicationState}
          admin={currentUser.type === "admin"}
        />
      )
    );
  if (view === "agreement")
    return (
      (applicationState || currentUser.type === "user") && (
        <FosterAgreementView
          setView={setView}
          applicationData={applicationState}
          admin={currentUser.type === "admin"}
          curAppId={applicationId}
          curUserId={currentUser._id}
          setCurAppId={setApplicationId}
        />
      )
    );
  if (view === "submitted") return <ApplicationSubmittedView />;
  return <ApplicationSubmittedView />;
}

export default FosterApplication;
