import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Select,
  Progress,
  Grid,
  useColorModeValue,
  Flex,
  Image,
  Icon,
  chakra,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  TableContainer,
  CircularProgress,
  CircularProgressLabel,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
} from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { MdLock } from "react-icons/md";
import SkillCard from "../components/SkillCard";
import PDFReader from "../components/PDFReader";

const DashboardPage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonColor = "#7E00FB";
  const GradientText = chakra(Text, {
    baseStyle: {
      bgClip: "text",
      bgGradient: "linear(to-r, #7E00FB, #4B0095)",
      fontWeight: "bold",
    },
  });
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [certification1, setCertification1] = useState("");
  const [certification2, setCertification2] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const {
    isOpen: isResumeModalOpen,
    onOpen: onOpenResumeModal,
    onClose: onCloseResumeModal,
  } = useDisclosure();
  const {
    isOpen: isFilterModalOpen,
    onOpen: onOpenFilterModal,
    onClose: onCloseFilterModal,
  } = useDisclosure();

  const compatibilityColor = (percentage: number): string => {
    const hue = (percentage / 100) * 120; // Adjusted hue calculation
    return `hsl(${hue}, 100%, 50%)`; // Gradual transition from red to green
  };

  const certificationOptions = [
    { label: "Project Management Professional", value: "pmp" },
    { label: "Certified Associate in Project Management", value: "capm" },
    // ... other options
  ];

  const measurements = [
    { label: "Measurement 1", value: 70 },
    { label: "Measurement 2", value: 40 },
    { label: "Measurement 3", value: 80 },
  ];

  const tableDataset = [
    { company: "NCS - Intern", compatibility: 70, skills: "C++, React" },
    {
      company: "SIA - Project Manager",
      compatibility: 40,
      skills: "Scrum, management",
    },
    {
      company: "Google - Junior Software Engineer",
      compatibility: 90,
      skills: "NextJS, MongoDB",
    },
    {
      company: "Facebook - HR",
      compatibility: 60,
      skills: "Recruitment, Administration",
    },
  ];

  const skills = [
    {
      title: "Advanced Excel",
      description: "Why Learn it?",
      points: [
        "Required for data analysis roles",
        "35% of job postings mention it",
      ],
      outcome: "+15% Job Compatibility",
    },
    {
      title: "Python Programming",
      description: "Why Learn it?",
      points: [
        "Widely used in web development, data analysis, and AI",
        "High demand for Python developers",
      ],
      outcome: "+20% Job Compatibility",
    },
    {
      title: "Project Management",
      description: "Why Learn it?",
      points: [
        "Essential skill for leading teams and delivering projects",
        "In-demand skill across various industries",
      ],
      outcome: "+18% Job Compatibility",
    },
    // Add more skills as needed
  ];

  const handleUploadResume = () => {
    // Logic to handle resume upload will go here
    // For now, we'll just set the state to true
    setResumeUploaded(true);
  };

  const handleCompare = () => {
    // Here you would usually fetch the data for the selected certifications
    console.log("Comparing", certification1, "vs", certification2);
    onOpen();
  };

  const ResumeCard = () => {
    // ref for the hidden file input element
    const fileInputRef = useRef(null);

    // function to call when file is dropped or selected
    const onFileDrop = (event: any) => {
      const files = event.target.files || event.dataTransfer.files;
      if (files.length > 0 && files[0].type === "application/pdf") {
        setUploadedFile(files[0]);
        setResumeUploaded(true);
        console.log(files);
      }
    };
    const LabelBox = chakra(Box, {
      shouldForwardProp: (prop) => !["htmlFor"].includes(prop),
    });

    return (
      <Box
        p={5}
        bg={bgColor}
        boxShadow="md"
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        textAlign="left"
        position="relative"
        onClick={resumeUploaded ? onOpenResumeModal : undefined}
      >
        <GradientText mb={2} fontSize="xl">
          Resume
        </GradientText>
        <Text mb={3}>Upload your resume</Text>
        {!resumeUploaded ? (
          <LabelBox
            as="label"
            htmlFor="file-upload"
            borderWidth={2}
            borderStyle="dashed"
            borderColor={borderColor}
            borderRadius="lg"
            p={10}
            transition="all 0.24s ease-in-out"
            _hover={{
              bg: useColorModeValue("gray.100", "gray.600"),
              borderColor: useColorModeValue("gray.300", "gray.500"),
            }}
            cursor="pointer"
            textAlign="center"
            m={0}
            width="100%"
            display="block"
          >
            <Icon as={FiUpload} w={12} h={12} mb={3} />
            <Text>Drag & Drop your files here</Text>
            <input
              id="file-upload"
              type="file"
              multiple
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={onFileDrop}
              accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
          </LabelBox>
        ) : (
          <Flex
            direction={{ base: "column", md: "row" }}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Box>
              <Heading size="md" mb={4}>
                Your Resume Score
              </Heading>
              <CircularProgress
                value={87}
                color={compatibilityColor(87)}
                size="200px"
                thickness="10px"
                fontWeight="bold"
              >
                <CircularProgressLabel color={compatibilityColor(87)}>
                  87%
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
            <VStack align="stretch" pl={{ md: 6 }}>
              {measurements.map((m, index) => (
                <Box key={index} width="100%">
                  <Text fontSize="md" fontWeight="bold">
                    {m.label}
                  </Text>
                  <Progress
                    value={m.value}
                    size="sm"
                    colorScheme="green"
                    borderRadius="full"
                    height="4px"
                    width="100%"
                  />
                </Box>
              ))}
            </VStack>
          </Flex>
        )}
      </Box>
    );
  };

  const ResumeModal = ({ isOpen, onClose }: any) => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        p={2}
        bg={bgColor}
        boxShadow="md"
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <ModalHeader>
          <GradientText>Resume</GradientText>
          <Heading size="md" mt={2} mb={4}>
            Your Resume Score
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            direction={{ base: "column", md: "row" }}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Box flexShrink={0}>
              <CircularProgress
                value={87}
                color={compatibilityColor(87)}
                size="200px"
                thickness="10px"
                fontWeight="bold"
              >
                <CircularProgressLabel color={compatibilityColor(87)}>
                  87%
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
            <VStack align="start" pl={{ md: 6 }}>
              {measurements.map((m, index) => (
                <Box key={index} width="100%">
                  <Text fontSize="lg" fontWeight="bold">
                    {m.label}
                  </Text>
                  <Progress
                    value={m.value}
                    size="md"
                    colorScheme="green"
                    borderRadius="full"
                    height="4px"
                    width="100%"
                  />
                </Box>
              ))}
            </VStack>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => {
        // Do something with the data
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <Box p={5}>
      <Flex justifyContent="flex-start" alignItems="center" mb={10}>
        <Image src="/logo.png" alt="Logo" boxSize="50px" mr={2} />
        <GradientText fontSize="2xl">Product Name</GradientText>
        <Button
          backgroundColor={buttonColor}
          color="white"
          onClick={handleUploadResume}
          ml={4}
        >
          Toggle Resume Upload
        </Button>
      </Flex>
      {/* Updated Grid layout */}
      <Grid templateColumns={{ md: "1fr 2fr" }} gap={6}>
        {/* Left column (1/3 width) */}
        <VStack spacing={4} align="stretch" width="full">
          <ResumeCard />

          {/* Certification Insight Card */}
          <Box
            p={5}
            bg={bgColor}
            boxShadow="md"
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <GradientText mb={2} fontSize="xl">
              Certification Insight
            </GradientText>
            <Text mb={3}>
              Compare your certifications against market demands
            </Text>
            <VStack spacing={3}>
              <Select placeholder="Select certification 1" width="full">
                {certificationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <Select placeholder="Select certification 2" width="full">
                {certificationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <Button
                backgroundColor={buttonColor}
                color="white"
                onClick={handleCompare}
                width="full"
              >
                Compare
              </Button>
            </VStack>
          </Box>
        </VStack>
        {/* Right column (2/3 width) */}
        <VStack spacing={4} align="stretch" width="full">
          {/* Job Qualification Scale Card */}
          <Box
            p={5}
            bg={bgColor}
            boxShadow="md"
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            maxHeight="400px"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <GradientText mb={2} fontSize="xl">
                Job Qualification Scale
              </GradientText>
              <IconButton
                aria-label="Filter jobs"
                icon={<FiFilter />}
                colorScheme="blue"
                variant="outline"
                onClick={onOpenFilterModal}
              />
            </Flex>
            <Text mb={3}>
              {resumeUploaded
                ? "Discover how your qualifications measure up to specific job requirements"
                : "Upload your resume to see how your qualifications measure up to specific job requirements"}
            </Text>
            <TableContainer maxHeight="200px" overflowY="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Company - Job Title</Th>
                    <Th>Compatibility</Th>
                    <Th>Skills Required</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tableDataset.map((data, index) => (
                    <Tr key={index}>
                      <Td>{data.company}</Td>
                      <Td>
                        {resumeUploaded ? (
                          <Text
                            color={compatibilityColor(data.compatibility)}
                            fontWeight="bold"
                          >
                            {data.compatibility}%
                          </Text>
                        ) : (
                          <Flex align="center" color="gray.500">
                            {" "}
                            {/* Use Flex to align items and apply gray color */}
                            <Icon as={MdLock} mr={2} />{" "}
                            {/* Add margin to separate icon from text */}
                            <Text>Resume Required</Text>
                          </Flex>
                        )}
                      </Td>
                      <Td>{data.skills}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          {/* Skills Development Card */}
          <VStack spacing={4} align="stretch" width="full">
            <Box
              p={5}
              bg={bgColor}
              boxShadow="md"
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              position="relative"
            >
              <GradientText mb={2} fontSize="xl">
                Skills Development
              </GradientText>
              <Text mb={3}>
                Discover personalized recommendations on how to advance your
                skillset for career growth
              </Text>
              {resumeUploaded ? (
                <>
                  <Text mb={3} fontWeight="semibold">
                    Suggested Skills to Learn:
                  </Text>
                  <Flex
                    overflowX="auto"
                    py={2} // Add padding on the y-axis if needed
                  >
                    {skills.map((skill, index) => (
                      <Box
                        key={index}
                        minWidth="220px" // Give a minimum width to your SkillCard components
                        flex="0 0 auto" // This makes sure that the box doesn't shrink
                        mx={2} // Add margin on the x-axis for spacing between items
                      >
                        <SkillCard
                          title={skill.title}
                          description={skill.description}
                          points={skill.points}
                          outcome={skill.outcome}
                        />
                      </Box>
                    ))}
                  </Flex>
                </>
              ) : (
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  height="100px"
                  border="1px dashed"
                  borderColor={borderColor}
                  borderRadius="md"
                  p={5}
                  position="relative"
                >
                  <Icon as={MdLock} w={8} h={8} color="gray.500" mb={2} />
                  <Text textAlign="center">Locked Content</Text>
                  <Text textAlign="center" fontSize="sm">
                    Upload Your Resume to Begin
                  </Text>
                </Flex>
              )}
            </Box>
          </VStack>
        </VStack>
      </Grid>{" "}
      <ResumeModal isOpen={isResumeModalOpen} onClose={onCloseResumeModal} />
      {/* Modal for showing comparison */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Certification Insight</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={4}>
              {/* Dropdowns */}
              <Select
                placeholder="Certification 1"
                onChange={(e) => setCertification1(e.target.value)}
              >
                {certificationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Certification 2"
                onChange={(e) => setCertification2(e.target.value)}
              >
                {certificationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Grid>
            <Button
              backgroundColor={buttonColor}
              color="white"
              width="full"
              onClick={handleCompare}
            >
              Compare
            </Button>
            <Text fontSize="xl" fontWeight="bold" mt={6} textAlign="center">
              Summary
            </Text>
            <Flex justifyContent="space-between" mt={4}>
              <Box width="50%">
                <Text fontSize="sm" fontWeight="bold">
                  Certification Demand:
                </Text>
                <Text fontSize="sm" fontWeight="semibold">
                  100 Jobs
                </Text>
              </Box>
              <Box width="50%">
                <Text fontSize="sm" fontWeight="bold">
                  Certification Demand:
                </Text>
                <Text fontSize="sm" fontWeight="semibold">
                  50 Jobs
                </Text>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Filter Modal */}
      <Modal isOpen={isFilterModalOpen} onClose={onCloseFilterModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter Jobs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add your filter options here */}
            <VStack spacing={4}>
              <Checkbox>Option 1</Checkbox>
              <Checkbox>Option 2</Checkbox>
              {/* Add more options as needed */}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseFilterModal}>
              Close
            </Button>
            <Button variant="ghost">Apply Filters</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DashboardPage;
