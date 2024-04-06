import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { MdLock } from "react-icons/md";

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
    // Add more skills as needed
  ];

  const handleUploadResume = () => {
    // Logic to handle resume upload will go here
    // For now, we'll just set the state to true
    setResumeUploaded(true);
  };

  useEffect(() => {
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      // Do something with the data
      console.log(data);
    })
    .catch(error => {
      // Handle any errors here
      console.error('Error fetching data: ', error);
    });
}, []);


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
          {/* Conditionally render Resume Card based on resumeUploaded state */}
          <Box
            p={5}
            bg={bgColor}
            boxShadow="md"
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
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
                  onClick={() => setResumeUploaded(true)} // Placeholder for actual upload logic
                >
                  Drag & Drop or browse
                </Button>
              </>
            ) : (
              <Flex
                direction={{ base: "column", md: "row" }}
                align="center"
                justify="space-between"
              >
                <Box flex="1">
                  <Heading size="lg" mt={2} mb={2}>
                    Your Resume Score
                  </Heading>
                  <CircularProgress
                    value={87}
                    color="green.400"
                    size="120px"
                    thickness="12px"
                  >
                    <CircularProgressLabel>87%</CircularProgressLabel>
                  </CircularProgress>
                </Box>
                <VStack
                  flex="1"
                  spacing={4}
                  align="stretch"
                  pr={{ base: 0, md: 4 }}
                >
                  {measurements.map((m, index) => (
                    <Box key={index}>
                      <Text mb={1}>{m.label}</Text>
                      <Progress value={m.value} size="sm" colorScheme="green" />
                    </Box>
                  ))}
                </VStack>
              </Flex>
            )}
          </Box>

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
              Discover how your qualifications measure up to specific job
              requirements
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
                    <Td>Resume Required</Td>
                    <Td>C++, React</Td>
                  </Tr>
                  <Tr>
                    <Td>SIA - Project Manager</Td>
                    <Td>Resume Required</Td>
                    <Td>Scrum, management</Td>
                  </Tr>
                  <Tr>
                    <Td>Google - Junior Software Engineer</Td>
                    <Td>Resume Required</Td>
                    <Td>NextJS, MongoDB, ...</Td>
                  </Tr>
                  <Tr>
                    <Td>Facebook - HR</Td>
                    <Td>Resume Required</Td>
                    <Td>Recruitment, Administration...</Td>
                  </Tr>
                  {/* Add as many <Tr>...</Tr> as needed */}
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
                  <Flex overflowX="auto">
                    {skills.map((skill, index) => (
                      <Box
                        key={index}
                        p={5}
                        bg="white"
                        boxShadow="sm"
                        borderRadius="md"
                        m={2}
                        minW="sm"
                        flex="none" // This ensures the box doesn't shrink
                      >
                        <Heading size="md" mb={3}>
                          {skill.title}
                        </Heading>
                        <Text fontSize="sm" mb={2}>
                          {skill.description}
                        </Text>
                        {skill.points.map((point, i) => (
                          <Text key={i} fontSize="sm" mb={1}>
                            &bull; {point}
                          </Text>
                        ))}
                        <Text fontSize="sm" mb={3}>
                          {skill.outcome}
                        </Text>
                        <Button colorScheme="purple" size="sm">
                          Learn More
                        </Button>
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
      </Grid>
    </Box>
  );
};

export default DashboardPage;
