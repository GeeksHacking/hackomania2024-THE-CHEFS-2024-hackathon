import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { MdLock } from "react-icons/md";
import SkillCard from "../components/SkillCard";

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

  const compatibilityColor = (percentage: number): string => {
    const hue = (percentage / 100) * 120; // Adjusted hue calculation
    return `hsl(${hue}, 100%, 50%)`; // Gradual transition from red to green
  };

  const measurements = [
    { label: "Measurement 1", value: 70 },
    { label: "Measurement 2", value: 40 },
    { label: "Measurement 3", value: 80 },
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

  const ResumeCard = () => (
    <Box
      p={5}
      bg={bgColor}
      boxShadow="md"
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      as={resumeUploaded ? "button" : undefined}
      onClick={resumeUploaded ? onOpen : undefined}
      textAlign="left"
    >
      <GradientText mb={2} fontSize="xl">
        Resume
      </GradientText>
      {!resumeUploaded ? (
        <>
          <Text mb={3}>Upload your resume</Text>
          <Button
            leftIcon={<FiUpload />}
            backgroundColor={buttonColor}
            color="white"
            onClick={handleUploadResume}
          >
            Drag & Drop or browse
          </Button>
        </>
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
              size="160px"
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
                <Text fontSize="sm" fontWeight="bold">
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

  const ResumeModal = ({ isOpen, onClose }: any) => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        p={5}
        bg={bgColor}
        boxShadow="md"
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <ModalHeader>
          <GradientText>Resume</GradientText>
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
                size="120px"
                thickness="12px"
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
                  <Text fontSize="sm" fontWeight="bold">
                    {m.label}
                  </Text>
                  <Progress
                    value={m.value}
                    size="sm"
                    colorScheme="green"
                    borderRadius="full" // Rounded edges
                    height="4px" // Thinner bar
                    width="100%" // Longer bar
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

  const handleUploadResume = () => {
    // Logic to handle resume upload will go here
    // For now, we'll just set the state to true
    setResumeUploaded(true);
  };

  return (
    <Box p={5}>
      <Flex justifyContent="flex-start" alignItems="center" mb={10}>
        <Image src="/logo.png" alt="Logo" boxSize="50px" mr={2} />
        <GradientText fontSize="2xl">Product Name</GradientText>
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
            <Select placeholder="Select certification" mb={3}></Select>
            <Button backgroundColor={buttonColor} color="white">
              Analyze
            </Button>
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
                colorScheme="blue" // Sets the icon button color to blue
                variant="outline" // Gives the button an outlined style
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
                  {/* These rows can be dynamically generated based on your data */}
                  <Tr>
                    <Td>NCS - Intern</Td>
                    <Td>
                      {resumeUploaded ? (
                        <Text color={compatibilityColor(70)} fontWeight="bold">
                          70%
                        </Text>
                      ) : (
                        "Resume Required"
                      )}
                    </Td>
                    <Td>C++, React</Td>
                  </Tr>
                  <Tr>
                    <Td>SIA - Project Manager</Td>
                    <Td>
                      {resumeUploaded ? (
                        <Text color={compatibilityColor(40)} fontWeight="bold">
                          40%
                        </Text>
                      ) : (
                        "Resume Required"
                      )}
                    </Td>
                    <Td>Scrum, management</Td>
                  </Tr>
                  <Tr>
                    <Td>Google - Junior Software Engineer</Td>
                    <Td>
                      {resumeUploaded ? (
                        <Text color={compatibilityColor(90)} fontWeight="bold">
                          90%
                        </Text>
                      ) : (
                        "Resume Required"
                      )}
                    </Td>
                    <Td>NextJS, MongoDB</Td>
                  </Tr>
                  <Tr>
                    <Td>Facebook - HR</Td>
                    <Td>
                      {resumeUploaded ? (
                        <Text color={compatibilityColor(60)} fontWeight="bold">
                          60%
                        </Text>
                      ) : (
                        "Resume Required"
                      )}
                    </Td>
                    <Td>Recruitment, Administration</Td>
                  </Tr>
                  {/* Add more rows as needed */}
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
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                    {skills.map((skill, index) => (
                      <SkillCard
                        key={index}
                        title={skill.title}
                        description={skill.description}
                        points={skill.points}
                        outcome={skill.outcome}
                      />
                    ))}
                  </SimpleGrid>
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
      </Grid>
      <ResumeModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default DashboardPage;
