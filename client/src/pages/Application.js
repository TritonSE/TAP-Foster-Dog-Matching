import { useForm } from "react-hook-form";
import React from "react";
import styled from "styled-components";
import ApplicationProgress from "../components/ApplicationProgress";
import Form from "../components/Form";
import { ControlledInput, InputLabel } from "../components/Input";
import PageSections from "../components/PageSections";
import { FOSTER_AGREEMENT_CONTENT } from "../constants/FOSTER_AGREEMENT";

function FosterApplication({ setView }) {
  const personalInfoRef = React.useRef();
  const fosterInfoRef = React.useRef();
  const outsideInfoRef = React.useRef();
  const { control, handleSubmit } = useForm();

  const applicationSections = React.useMemo(
    () => ({
      "Personal Information": personalInfoRef,
      "Foster Information": fosterInfoRef,
      "Outside Information": outsideInfoRef,
    }),
    []
  );

  const onSubmit = (data) => {
    console.log(data);
    setView("agreement");
  };

  const onError = (errors) => {
    console.log(errors);
    setView("agreement");
  };

  return (
    <PageSections sections={applicationSections}>
      <Form.Container>
        <Form.Title>Foster Application</Form.Title>
        <Form.Section title="Personal Information" ref={personalInfoRef}>
          <Form.SubSection title="Name">
            <ControlledInput control={control} label="First Name" name="firstname" required />
            <ControlledInput control={control} label="Last Name" name="lastname" required />
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
              <ControlledInput control={control} label="Zipcode" name="address.zipCode" required />
              <ControlledInput control={control} label="Country" name="address.country" required />
            </Form.Row>
          </Form.SubSection>
          <Form.SubSection title="E-mail">
            <ControlledInput
              control={control}
              label="ex: myname@example.com"
              name="email"
              required
            />
          </Form.SubSection>
          <Form.SubSection title="Date of Birth">
            <ControlledInput control={control} label="mm-dd-yyyy" name="dateOfBirth" required />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>Do you own or rent your home?</InputLabel>
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>Landlord&apos;s Name (if you own, just write n/a)*</InputLabel>
            <Form.Row>
              <Form.Column>
                <ControlledInput control={control} label="First Name" />
                <ControlledInput control={control} label="Landlord's Phone Number" />
              </Form.Column>
              <Form.Column>
                <ControlledInput control={control} label="Last Name" />
                <ControlledInput control={control} label="Landlord's Email Address" />
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
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput control={control} label="Where will your foster dog sleep at night?" />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput control={control} label="How many hours are you home a day?" />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Please describe a typical day for your dog while you are away."
              numLines={6}
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Who will be the primary caregiver for this foster dog?"
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>
              If you reside with other adults in the household, are they onboard to bring in a
              foster dog?
            </InputLabel>
            {/* TODO: radios */}
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>Do we have permission to do a home visit?</InputLabel>
            {/* TODO: radios */}
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Have you ever fostered a dog before? If so, please describe the experience and include as much detail as possible."
              numLines={14}
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Why do you wish to foster a dog?"
              numLines={14}
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>
              The dog you foster will not be made available for adoption until they receive standard
              intake vetting, while includes a wellness exam, rabies and 1 DHPP vaccine for adults,
              and 2 DHPP vaccines for puppies under 4 months. Are you able to make at least a 1
              month commitment to care for your foster dog?*
            </InputLabel>
            {/* TODO: radios */}
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>
              Size of Dog you are willing to foster (please mark all that apply): *
            </InputLabel>
            {/* TODO: checkboxes */}
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>
              Age of Dog you are willing to foster (please mark all that apply): *
            </InputLabel>
            {/* TODO: checkboxes */}
          </Form.SubSection>
        </Form.Section>

        <Form.Section title="Outside Information" ref={outsideInfoRef}>
          <Form.SubSection>
            <InputLabel>Please provide a personal reference </InputLabel>
            <Form.Row>
              <Form.Column>
                <ControlledInput control={control} label="First Name" />
                <ControlledInput control={control} label="Reference's Phone Number" />
                <ControlledInput control={control} label="Relation" />
              </Form.Column>
              <Form.Column>
                <ControlledInput control={control} label="Last Name" />
                <ControlledInput control={control} label="Reference's Email Address" />
                <ControlledInput control={control} label="Years Known" type="number" />
              </Form.Column>
            </Form.Row>
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput control={control} label="How did you hear about TAP?" numLines={6} />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="If you have any other pets, please list the number, age, types, and any issues they may have with a new dog."
              numLines={10}
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Are all the dogs in your home up to date on vaccines and in good health?"
              numLines={10}
            />
          </Form.SubSection>
          <Form.SubSection>
            <InputLabel>If you have other dogs in the home, are they spayed/neutered?</InputLabel>
            {/* TODO: radios */}
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Do you have any children? If so, please list the number and their experience with dogs."
              numLines={10}
            />
          </Form.SubSection>
          <Form.SubSection>
            <ControlledInput
              control={control}
              label="Please describe your living situation. If you rent, please tell us about your arrangement with your landlord pertaining to dogs."
              numLines={10}
            />
          </Form.SubSection>
        </Form.Section>
        {/* TODO: replace with button component */}
        <button type="button" onClick={handleSubmit(onSubmit, onError)}>
          Continue
        </button>
      </Form.Container>
    </PageSections>
  );
}

const FosterAgreementContainer = styled.div`
  height: 80vh;
  overflow-y: scroll;
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

function FosterAgreement({ setView }) {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onError = (errors) => {
    console.log(errors);
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
        {/* TODO: replace with button component */}
        <button type="button" onClick={() => setView("application")}>
          Back
        </button>
        <button type="button" onClick={handleSubmit(onSubmit, onError)}>
          Submit Application
        </button>
      </Form.Container>
    </FosterAgreementContainer>
  );
}

function Application() {
  const [view, setView] = React.useState("application");

  return (
    <>
      <ApplicationProgress currentStep={0} />
      {view === "application" ? (
        <FosterApplication setView={setView} />
      ) : (
        <FosterAgreement setView={setView} />
      )}
    </>
  );
}

export default Application;
