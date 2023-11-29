import {
  Box,
  Accordion,
  AccordionPanel,
  Form,
  FormField,
  TextInput,
  Button,
  Heading,
  Select,
  TextArea,
  CheckBox,
} from "grommet";
import { FormClose, StatusGood, Favorite } from "grommet-icons";
import { useRef, useState } from "react";
import Card from "@/components/Profile/Card";
import toast from "react-hot-toast";
import { useAuth } from "../Auth/provider";
import { useProfile } from "./ContextProvider";

const Experiences = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    title: "",
    description: "",
    years: { value: "0" },
    months: { value: "0" },
    publish: false,
  });
  // const [experiences, setExperiences] = useState([]); // [
  const ref = useRef(null);
  const { experience, setExperience } = useProfile();
  const { user } = useAuth();

  const renderPanelHeader = () => {
    return (
      <Box
        direction="row"
        align="center"
        pad={{ vertical: "medium" }}
        gap="medium"
        justify="between"
      >
        <strong>
          <Heading level={3}>
            {!open ? "Viltu stofna verkspjald?" : "Stofna verkspjald..."}
          </Heading>
        </strong>
        {!open ? (
          <Button
            primary
            label="Já takk!"
            onClick={() => {
              setTimeout(() => {
                ref.current?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          />
        ) : (
          <FormClose />
        )}
      </Box>
    );
  };

  const months = Array.from({ length: 11 }, (_, i) => i + 1);

  const years = Array.from({ length: 100 }, (_, i) => i + 1);

  const gamify = () => {
    return (
      <Box align="end">
        <StatusGood />
      </Box>
    );
  };

  console.log(
    "%c experience",
    "color:white; padding: 30px; background-color: darkgreen",
    experience
  );

  return (
    <>
      <Box ref={ref} pad={{ vertical: "large" }}>
        <Accordion
          activeIndex={open ? [0] : []}
          onActive={(newActiveIndex) => setOpen(!!newActiveIndex.length)}
        >
          <AccordionPanel header={renderPanelHeader()}>
            {open && (
              <Box flex="shrink">
                <Form
                  value={values}
                  validate="blur"
                  onChange={(nextValue) => setValues(nextValue)}
                  onReset={() => setValues({})}
                  onSubmit={async ({ value }) => {
                    const { title, years, months, description } = value;

                    const response = await fetch(
                      `/api/user/${user?.id}/experience`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          years: years?.value,
                          months: months?.value,
                          title: title,
                          description: description,
                          published: !!value?.publish,
                        }),
                      }
                    );
                    if (!response.ok) {
                      toast.error("Ekki tókst að stofna verkspjald");
                      console.error(response.error);
                      return;
                    }
                    const newExp = await response.json();
                    setExperience((prev) => [...prev, newExp]);
                    setOpen(false);
                    toast.success("Verkspjald stofnað!");
                  }}
                >
                  <Box pad="small" background="white">
                    <FormField
                      name="title"
                      htmlFor="title"
                      label="Titill"
                      validate={[
                        {
                          regexp: /^.{0,32}$/,
                          message: "32 stafa hámarki náð.",
                        },
                      ]}
                      validateOn="blur"
                    >
                      <TextInput id="title" name="title" type="title" />
                    </FormField>
                  </Box>
                  <Box pad="small" background="white">
                    <FormField
                      name="description"
                      htmlFor="description"
                      label="Lýsing á reynslu."
                      validate={[
                        {
                          regexp: /^.{0,176}$/,
                          message: "176 stafa hámarki náð.",
                        },
                      ]}
                      validateOn="blur"
                    >
                      <TextArea id="description" name="description" />
                    </FormField>
                  </Box>
                  <Box
                    background="white"
                    direction="row"
                    justify="between"
                    pad="small"
                    gap="medium"
                  >
                    <FormField name="years" htmlFor="years" label="Ár" x>
                      <Select
                        placeholder="Ár"
                        id="years"
                        name="years"
                        type="years"
                        options={years.map((y) => {
                          return { label: y, value: y };
                        })}
                      />
                    </FormField>

                    <FormField name="months" htmlFor="months" label="Mánuðir">
                      <Select
                        placeholder="Mánuðir"
                        id="months"
                        name="months"
                        type="months"
                        options={months.map((month) => {
                          return { label: month, value: month };
                        })}
                      />
                    </FormField>
                  </Box>
                  <Box
                    background="white"
                    pad="small"
                    direction="row"
                    gap="medium"
                    justify="between"
                  >
                    <CheckBox id="publish" name="publish" label="Birta?" />
                    <Button
                      disabled={
                        !values?.title ||
                        !values?.description ||
                        !(values?.months && values?.years)
                      }
                      type="submit"
                      primary
                      label="Submit"
                    />
                  </Box>
                </Form>
              </Box>
            )}
          </AccordionPanel>
        </Accordion>
      </Box>
      <Box
        flex="grow"
        justify="center"
        align="center"
        gap="medium"
        pad={{ vertical: "medium" }}
        direction="row"
        wrap={true}
      >
        <>
          {experience?.map((exp) => {
            return (
              <Card
                key={exp.id}
                experienceId={exp.id}
                title={exp.title}
                description={exp.description}
                years={exp.years}
                months={exp.months}
                editMode={true}
                published={exp.published}
              />
            );
          })}
        </>
      </Box>
    </>
  );
};
export default Experiences;
