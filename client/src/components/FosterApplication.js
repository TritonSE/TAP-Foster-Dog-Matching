import { useForm } from "react-hook-form";
import React from "react";
import styled from "styled-components";
import Form from "./Form";
import { ControlledInput, InputLabel } from "./Input";
import PageSections from "./PageSections";
import { FOSTER_AGREEMENT_CONTENT } from "../constants/FOSTER_AGREEMENT";
import { ControlledCheckboxes } from "./Checkboxes";
import { ControlledRadios } from "./Radios";
import { device } from "../utils/useResponsive";
import { Colors } from "./Theme";
import { createApplication, getApplication } from "../services/application";
import { AuthContext } from "../contexts/AuthContext";

const Button = styled.div`
  background: ${Colors.green};
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

function FosterApplicationView({
  setView,
  setApplicationData,
  applicationData,
  admin,
  curApplication,
}) {
  const personalInfoRef = React.useRef();
  const fosterInfoRef = React.useRef();
  const outsideInfoRef = React.useRef();

  const initialVals = () => {
    console.log("in function");
    console.log(admin, curApplication);
    if (admin && curApplication != null) {
      console.log("printing data");
      return curApplication;
    }
    return applicationData;
  };
  const { control, watch, handleSubmit } = useForm({
    reValidateMode: "onChange",
    defaultValues: initialVals(),
  });

  const applicationSections = React.useMemo(
    () => ({
      "Personal Information": personalInfoRef,
      "Foster Information": fosterInfoRef,
      "Outside Information": outsideInfoRef,
    }),
    []
  );

  React.useEffect(() => {
    console.log(curApplication);
  }, []);

  const onSubmit = (data) => {
    // move onto agreement page + store data from current form for next page
    setApplicationData(data);
    setView("agreement");
  };

  const onError = (data) => {
    // TODO: implement onError
    // setView("agreement"); // uncomment this to see the foster agreement w/o filling out the form
  };

  return (
    <PageSections sections={applicationSections}>
      <Form.Container>
        <Form.Title>Foster Application</Form.Title>
        <Form.Section title="Personal Information" ref={personalInfoRef}>
          <Form.SubSection title="Name">
            <ControlledInput control={control} label="First Name" name="firstName" required />
            <ControlledInput control={control} label="Last Name" name="lastName" required />
          </Form.SubSection>
          <Form.SubSection title="Address">
            <ControlledInput
              control={control}
              label="Street Address"
              name="address.addressOne"
              required
            />
            <ControlledInput
              control={control}
              label="Street Address Line 2"
              name="address.addressTwo"
            />
            <Form.Row>
              <ControlledInput control={control} label="City" name="address.city" required />
              <ControlledInput control={control} label="State" name="address.state" required />
            </Form.Row>
            <Form.Row>
              <ControlledInput
                control={control}
                label="Zipcode"
                name="address.zipcode"
                type="number"
                rules={{
                  maxLength: 5,
                }}
                required
              />
              <ControlledInput
                control={control}
                label="Country"
                name="address.country"
                defaultValue="United States"
                required
              />
            </Form.Row>
          </Form.SubSection>
          <Form.SubSection title="E-mail">
            <ControlledInput
              control={control}
              label="ex: myname@example.com"
              name="email"
              rules={{
                pattern:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
              }}
              required
            />
          </Form.SubSection>
          <Form.SubSection title="Date of Birth">
            <ControlledInput
              control={control}
              label="mm-dd-yyyy"
              name="dateOfBirth"
              rules={{
                maxLength: 10,
                pattern: /(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])-\d{4}/g,
              }}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>Do you own or rent your home?</InputLabel>
            <ControlledRadios
              control={control}
              options={["Own", "Rent"]}
              name="homeType"
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>Landlord&apos;s Name (if you own, just write n/a)*</InputLabel>
            <Form.Row>
              <Form.Column>
                <ControlledInput
                  control={control}
                  label="First Name"
                  name="landlord.firstName"
                  required
                />
                <ControlledInput
                  control={control}
                  label="Landlord's Phone Number"
                  name="landlord.phone"
                  rules={{
                    pattern: /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/,
                  }}
                  required={watch("landlord.firstName") !== "n/a"}
                />
              </Form.Column>
              <Form.Column>
                <ControlledInput
                  control={control}
                  label="Last Name"
                  name="landlord.lastName"
                  required={watch("landlord.firstName") !== "n/a"}
                />
                <ControlledInput
                  control={control}
                  label="Landlord's Email Address"
                  name="landlord.email"
                  rules={{
                    pattern:
                      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                  }}
                  required={watch("landlord.firstName") !== "n/a"}
                />
              </Form.Column>
            </Form.Row>
          </Form.SubSection>
        </Form.Section>

        <Form.Section title="Foster Information" ref={fosterInfoRef}>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Do you have any breed and/or size restrictions where you live. If yes, please list."
              numLines={6}
              name="fosterInfo.restrictions"
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Where will your foster dog sleep at night?"
              name="fosterInfo.sleepLocation"
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="How many hours are you home a day?"
              name="fosterInfo.hoursAtHome"
              type="number"
              rules={{ max: 24 }}
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Please describe a typical day for your dog while you are away."
              numLines={6}
              name="fosterInfo.typicalDay"
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Who will be the primary caregiver for this foster dog?"
              name="fosterInfo.primaryCaregiver"
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>
              If you reside with other adults in the household, are they onboard to bring in a
              foster dog?
            </InputLabel>
            <ControlledRadios
              control={control}
              options={["Yes", "No", "Don't know, haven't asked them"]}
              name="fosterInfo.othersOnboard"
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>Do we have permission to do a home visit?</InputLabel>
            <ControlledRadios
              control={control}
              options={["Yes", "No"]}
              name="fosterInfo.permissionToVisit"
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Have you ever fostered a dog before? If so, please describe the experience and include as much detail as possible."
              numLines={14}
              name="fosterInfo.pastExperience"
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Why do you wish to foster a dog?"
              numLines={14}
              name="fosterInfo.whyFoster"
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
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>
              Size of Dog you are willing to foster (please mark all that apply): *
            </InputLabel>
            <ControlledCheckboxes
              control={control}
              name="fosterInfo.sizeOfDog"
              required
              options={["Under 25 lbs", "25-50 lbs", "Over 50 lbs", "Open"]}
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
                  label="First Name"
                  name="reference.firstName"
                  required
                />
                <ControlledInput
                  control={control}
                  label="Reference's Phone Number"
                  name="reference.phone"
                  rules={{
                    pattern: /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/,
                  }}
                  required
                />
                <ControlledInput
                  control={control}
                  label="Relation"
                  name="reference.relation"
                  required
                />
              </Form.Column>
              <Form.Column>
                <ControlledInput
                  control={control}
                  label="Last Name"
                  name="reference.lastName"
                  required
                />
                <ControlledInput
                  control={control}
                  label="Reference's Email Address"
                  name="reference.email"
                  rules={{
                    pattern:
                      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                  }}
                  required
                />
                <ControlledInput
                  control={control}
                  label="Years Known"
                  type="number"
                  name="reference.yearsKnown"
                  required
                />
              </Form.Column>
            </Form.Row>
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="How did you hear about TAP?"
              numLines={6}
              name="otherInfo.howDidYouHearAboutTAP"
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="If you have any other pets, please list the number, age, types, and any issues they may have with a new dog."
              numLines={10}
              name="otherInfo.otherPets"
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Are all the dogs in your home up to date on vaccines and in good health?"
              numLines={10}
              name="otherInfo.dogsHealth"
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>If you have other dogs in the home, are they spayed/neutered?</InputLabel>
            <ControlledRadios
              control={control}
              options={["Yes", "No"]}
              name="otherInfo.dogsNeutered"
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Do you have any children? If so, please list the number and their experience with dogs."
              numLines={10}
              name="otherInfo.children"
              required
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Please describe your living situation. If you rent, please tell us about your arrangement with your landlord pertaining to dogs."
              numLines={10}
              name="otherInfo.livingSituation"
              required
            />
          </Form.SubSection>
        </Form.Section>
        <Form.Actions>
          <div /> {/* Spacer */}
          <Button onClick={handleSubmit(onSubmit, onError)}>Continue</Button>
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

function FosterAgreementView({ setView, applicationData, admin, curApplication }) {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // temporary user id
    const userId = "6216d4d491e35e349858ae1f";
    // Cleaning up data for request
    const reqBody = {
      ...applicationData,
      ...{ agreement: data },
      ...{ status: "Step 1: Application", completedActionItems: false },
      ...{ user: userId },
    };

    console.log(reqBody);
    reqBody.otherInfo.dogsNeutered = reqBody.otherInfo.dogsNeutered !== "No";
    reqBody.fosterInfo.permissionToVisit = reqBody.fosterInfo.permissionToVisit !== "No";
    reqBody.address.zipcode = parseInt(reqBody.address.zipcode, 10);
    reqBody.reference.yearsKnown = parseInt(reqBody.reference.yearsKnown, 10);
    const format = (inputDate) =>
      [inputDate.slice(5, 7), inputDate.slice(8, 10), inputDate.slice(0, 4)].join("/");
    reqBody.agreement.date = format(reqBody.agreement.date);

    // make a new application
    createApplication(reqBody).then((response) => {
      console.log(response.ok);
      console.log(response.data);
    });
  };

  const onError = (_) => {
    // TODO: implement onError
  };

  return (
    <FosterAgreementContainer>
      <Form.Container>
        <Form.Title>Foster Agreement</Form.Title>
        <FosterAgreementContent>{FOSTER_AGREEMENT_CONTENT}</FosterAgreementContent>
        <SignatureContainer>
          <Form.SubSection>
            <ControlledInput control={control} name="name" label="Print your name" required />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput control={control} name="date" label="Date" type="date" required />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput control={control} name="signature" label="Signature" required />
          </Form.SubSection>
        </SignatureContainer>
        <Form.Actions>
          <Button onClick={() => setView("application")}>Back</Button>
          <Button onClick={handleSubmit(onSubmit, onError)}>Submit Application</Button>
          <div /> {/* Spacer */}
        </Form.Actions>
      </Form.Container>
    </FosterAgreementContainer>
  );
}

function FosterApplication() {
  const [view, setView] = React.useState("application");
  const [applicationData, setApplicationData] = React.useState({});

  const { signedIn, currentUser } = React.useContext(AuthContext);

  // admin view, want to see exitsting application
  const curAppId = "6215a197a07c26eabdb20238";
  const [curApplication, setCurApplication] = React.useState();
  const [loaded, setLoaded] = React.useState(false);
  // get data if data exists
  React.useEffect(() => {
    if (curAppId) {
      getApplication(curAppId).then((res) => {
        setCurApplication(res.data.application);
        setLoaded(true);
      });
    }
  }, []);

  if (view === "application")
    return (
      (loaded || !currentUser.type === "admin") && (
        <FosterApplicationView
          setView={setView}
          applicationData={applicationData}
          setApplicationData={setApplicationData}
          admin={currentUser.type === "admin"}
          curApplication={curApplication}
        />
      )
    );
  return (
    (loaded || !currentUser.type === "admin") && (
      <FosterAgreementView
        setView={setView}
        applicationData={applicationData}
        admin={currentUser.type === "admin"}
        curApplication={curApplication}
      />
    )
  );
}

export default FosterApplication;
