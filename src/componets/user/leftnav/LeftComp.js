import React, { useState, useEffect } from "react";
import { Form, Accordion, Button } from "react-bootstrap";
import Slider from "@mui/material/Slider";
import { getPostedJobById } from "../../../api/auth";
import Loading from "../../../api/Loading";


const LeftComp = ({ onFilter }) => {
  const [experience, setExperience] = useState(null); // null means "no filter"
  const [selectedModes, setSelectedModes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedEducations, setSelectedEducations] = useState([]);

  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [modeCounts, setModeCounts] = useState({});
  const [locationCounts, setLocationCounts] = useState({});
  const [educationCounts, setEducationCounts] = useState({});

  const [showAll, setShowAll] = useState(false);
  const educationEntries = Object.entries(educationCounts);
  const itemsToShow = showAll ? educationEntries : educationEntries.slice(0, 5);
  const handleSliderChange = (event, newValue) =>
    setExperience(newValue === 0 ? null : newValue);

  const handleCheckboxChange = (event, setState, currentState) => {
    const { value, checked } = event.target;
    const updated = checked
      ? [...currentState, value]
      : currentState.filter((v) => v !== value);
    setState(updated);
  };

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await getPostedJobById();
        if (!jobs) {
          console.log("No jobs found or error fetching jobs");
          return;
        }

        setAllJobs(jobs);

        const modeMap = {};
        const locationMap = {};
        const educationMap = {};

        jobs.forEach((job) => {
          const mode = capitalize(job.work_mode || "");
          const location = capitalize(job.location || "");
          const education = capitalize(job.education || "");

          if (mode) modeMap[mode] = (modeMap[mode] || 0) + 1;
          if (location)
            locationMap[location] = (locationMap[location] || 0) + 1;
          if (education)
            educationMap[education] = (educationMap[education] || 0) + 1;
        });

        setModeCounts(modeMap);
        setLocationCounts(locationMap);
        setEducationCounts(educationMap);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = allJobs.filter((job) => {
      const mode = capitalize(job.work_mode || "");
      const location = capitalize(job.location || "");
      const education = capitalize(job.education || "");

      const jobMinExp = parseInt(job.Min_work_experience) || 0;
      const jobMaxExp = parseInt(job.Max_work_experience) || 100;

      const matchMode =
        selectedModes.length === 0 || selectedModes.includes(mode);
      const matchLocation =
        selectedLocations.length === 0 || selectedLocations.includes(location);
      const matchEducation =
        selectedEducations.length === 0 ||
        selectedEducations.includes(education);
      const matchExperience =
        experience === null ||
        (experience >= jobMinExp && experience <= jobMaxExp);

      return matchMode && matchLocation && matchEducation && matchExperience;
    });

    setFilteredJobs(filtered);
    if (onFilter) onFilter(filtered);
  }, [
    experience,
    selectedModes,
    selectedLocations,
    selectedEducations,
    allJobs,
  ]);

  return (
    <div className="filter-sidebar mob-tbt-view">
      <h5 className="mb-3">Filters</h5>
      <Accordion
        defaultActiveKey={["0", "1", "2", "3"]}
        alwaysOpen
        flush
        className="filter-accordion"
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Work Mode</Accordion.Header>
          <Accordion.Body>
            {/* {Object.entries(modeCounts).map(([mode, count], idx) => (
              <Form.Check
                className="mt-2"
                key={idx}
                type="checkbox"
                value={mode}
                label={`${mode} (${count})`}
                checked={selectedModes.includes(mode)}
                onChange={(e) =>
                  handleCheckboxChange(e, setSelectedModes, selectedModes)
                }
              />
            ))} */}
            {Object.entries(modeCounts).map(([mode, count], idx) => (
              <div
                key={idx}
                className="mt-2 d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const isSelected = selectedModes.includes(mode);
                  if (isSelected) {
                    setSelectedModes(selectedModes.filter((m) => m !== mode));
                  } else {
                    setSelectedModes([...selectedModes, mode]);
                  }
                }}
              >
                <Form.Check
                  type="checkbox"
                  value={mode}
                  checked={selectedModes.includes(mode)}
                  readOnly
                  className="me-2"
                />
                <span>{`${mode} (${count})`}</span>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Experience</Accordion.Header>
          <Accordion.Body>
            <div className="d-flex justify-content-between mb-1 mt-2">
              <span>{experience !== null ? `${experience} Yrs` : "All"}</span>
            </div>
            <Slider
              value={experience !== null ? experience : 0}
              onChange={handleSliderChange}
              min={0}
              max={30}
              valueLabelDisplay="auto"
              sx={{ color: "#1976d2" }}
            />
            <div className="d-flex justify-content-between">
              <small>0 Yrs</small>
              <small>30 Yrs</small>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Location</Accordion.Header>
          <Accordion.Body>
            {Object.entries(locationCounts).map(([loc, count], idx) => {
              const checkboxId = `location-${idx}`;
              return (
                <Form.Check
                  className="mt-2"
                  key={idx}
                  id={checkboxId}
                  type="checkbox"
                  value={loc}
                  label={`${loc} (${count})`}
                  checked={selectedLocations.includes(loc)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e,
                      setSelectedLocations,
                      selectedLocations
                    )
                  }
                />
              );
            })}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Education</Accordion.Header>
          <Accordion.Body className={showAll ? "scrollable-edu" : ""}>
            {itemsToShow.map(([edu, count], idx) => {
              const checkboxId = `education-${idx}`;
              return (
                <Form.Check
                  className="mt-2"
                  key={idx}
                  id={checkboxId}
                  type="checkbox"
                  value={edu}
                  label={`${edu} (${count})`}
                  checked={selectedEducations.includes(edu)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e,
                      setSelectedEducations,
                      selectedEducations
                    )
                  }
                />
              );
            })}

            {educationEntries.length > 5 && (
              <Button
                variant="link"
                className="mt-2 p-0"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Less View" : "View More"}
              </Button>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="mt-4 text-muted">
        <small>{filteredJobs.length} jobs match your filters</small>
      </div>
    </div>
  );
};

export default LeftComp;
