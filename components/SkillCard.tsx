import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

interface SkillCardProps {
  title: string;
  description: string;
  points: string[];
  outcome: string;
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  description,
  points,
  outcome,
}) => {
  return (
    <Box
      bg="white"
      boxShadow="sm"
      borderRadius="md"
      p={5}
      borderWidth="1px"
      borderColor="gray.200"
      width="400px"
    >
      <VStack align="stretch" spacing={3}>
        <Heading size="md" mb={3}>
          {title}
        </Heading>
        <Text fontSize="sm" mb={2}>
          {description}
        </Text>
        {points.map((point, i) => (
          <Text key={i} fontSize="sm" mb={1}>
            &bull; {point}
          </Text>
        ))}
        <Text fontSize="sm" mb={3} fontWeight="semibold">
          {outcome}
        </Text>
        <Button backgroundColor="#7E00FB" color="white" width="full">
          Learn More
        </Button>
      </VStack>
    </Box>
  );
};

export default SkillCard;
