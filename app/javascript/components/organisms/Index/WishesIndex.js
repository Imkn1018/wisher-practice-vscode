import {
  ChakraProvider,
  Stack,
  Box,
  Image,
  Text,
  Wrap,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Button,
  ModalFooter,
} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import {
  memo,
  VFC,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
} from 'react';
import { useHistory, BrowserRouter } from 'react-router-dom';
import { useSelectWish } from '../../../hooks/useSelectWish';

function WishesIndex(props) {
  const { wishes, relations, tags } = props;
  // const { selectedWish, selectWish } = useSelectWish();
  const [selectedWish, setSelectedWish] = useState([]);
  const [selectedRelation, setSelectedRelation] = useState([]);
  const [selectedWishTags, setSelectedWishTags] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onOpenEdit = () => {
    setIsEditModalOpen(true);
  };
  const onCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  const onClickSelectWish = useCallback(
    (id) => {
      const targetWish = wishes.find((wish) => wish.id === id);
      setSelectedWish(targetWish);
      console.log(relations);
      console.log(tags);
      // relation
      const targetRelation = relations.filter(
        (relation) => selectedWish.id === relation.wish_id
      );
      setSelectedRelation(targetRelation);
      // 複数のrelationがある場合もある
      // tag
      selectedRelation.map((relation) => {
        const targetTags = tags.filter((tag) => relation.tag_id === tag.id);
        setSelectedWishTags(targetTags);
      });
      console.log(selectedRelation);
      console.log(selectedWishTags);
      onOpen();
    },
    [wishes, selectedWish, selectedRelation, onOpen]
  );
  return (
    <ChakraProvider>
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {wishes.map((wish, id) => (
          <WrapItem key={id}>
            <Box
              w="300px"
              h="300px"
              bg="white"
              borderRadius="10px"
              shadow="md"
              p={4}
              _hover={{ cursor: 'pointer', opacity: 0.8 }}
              onClick={() => {
                onClickSelectWish(wish.id);
                console.log(selectedWish.id);
                console.log(selectedWishTags);
              }}
            >
              <Stack textAlign="center">
                <Image
                  boxSize="160px"
                  borderRadius="full"
                  src={wish.image}
                  alt={wish.wish_title}
                  m="auto"
                />
                <Text fontSize="lg" fontWeight="bold">
                  {wish.wish_title}
                </Text>
                <Text fontSize="sm" color="gray">
                  {wish.memo}
                </Text>
                {wish?.tags?.map((wishTag) => (
                  <Text>{wishTag.tag_name}</Text>
                ))}
              </Stack>
            </Box>
          </WrapItem>
        ))}
      </Wrap>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="scale"
      >
        <ModalOverlay>
          <ModalContent pb={2}>
            <ModalHeader>Show</ModalHeader>
            <ModalCloseButton />
            <ModalBody mx={4}>
              <Stack textAlign="center">
                <Image
                  boxSize="160px"
                  borderRadius="full"
                  src=""
                  alt={selectedWish?.wish_title}
                  m="auto"
                />
                <Text fontSize="lg" fontWeight="bold">
                  {selectedWish?.wish_title}
                </Text>
                <Text fontSize="sm" color="gray">
                  {selectedWish?.memo}
                </Text>

                <Text>{selectedWish.tags?.tag_name}</Text>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onOpenEdit}>Edit</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>

      {isEditModalOpen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          autoFocus={false}
          motionPreset="scale"
        >
          <ModalOverlay>
            <ModalContent pb={2}>
              <ModalHeader>Edit</ModalHeader>
              <ModalCloseButton onClick={onCloseEdit} />
              <ModalBody mx={4}>
                <Stack textAlign="center">
                  <Image
                    boxSize="160px"
                    borderRadius="full"
                    src=""
                    alt={selectedWish.wish_title}
                    m="auto"
                  />
                  <Text fontSize="lg" fontWeight="bold">
                    {selectedWish.wish_title}
                  </Text>
                  <Text fontSize="sm" color="gray">
                    {selectedWish.memo}
                  </Text>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onOpenEdit}>Edit</Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}
    </ChakraProvider>
  );
}

export default WishesIndex;
