import {
  ChakraProvider,
  Stack,
  Box,
  Image,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import { memo, VFC, useState, useEffect, ChangeEvent } from 'react';

function WishesIndex({ image, title, memo }) {
  const [wishes, setWishes] = useState([]);
  return (
    <ChakraProvider>
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        <WrapItem>
          <Box
            w="260px"
            h="260px"
            bg="white"
            borderRadius="10px"
            shadow="md"
            p={4}
            _hover={{ cursor: 'pointer', opacity: 0.8 }}
          >
            <Stack textAlign="center">
              <Image
                boxSize="160px"
                borderRadius="full"
                src={image}
                alt={title}
                m="auto"
              />
              <Text fontSize="lg" fontWeight="bold">
                {title}
              </Text>
              <Text fontSize="sm" color="gray">
                {memo}
              </Text>
            </Stack>
          </Box>
        </WrapItem>
      </Wrap>
    </ChakraProvider>
  );
}

export default WishesIndex;
