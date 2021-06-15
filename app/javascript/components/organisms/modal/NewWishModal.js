import {
  ChakraProvider,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { memo, VFC, useState, useEffect, ChangeEvent } from 'react';

function NewWishModal({ name }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [wishTitle, setWishTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [imageUrl, setImgaeUrl] = useState('');
  return (
    <ChakraProvider>
      <Button onClick={onOpen}>OpenButton</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="scale"
      >
        <ModalOverlay>
          <ModalContent pb={2}>
            <ModalHeader>Show</ModalHeader>
            <ModalCloseButton
              onClick={() => {
                setWishTitle('');
                setMemo('');
                setImgaeUrl('');
              }}
            />
            <ModalBody mx={4}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={wishTitle}
                    onChange={(e) => setWishTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>memo</FormLabel>
                  <Input
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const imageFile = e.target.files[0];
                      const imageUrl = URL.createObjectURL(imageFile);
                      setImgaeUrl(imageUrl);
                    }}
                  />
                </FormControl>
                {imageUrl && <Image src={imageUrl} />}
              </Stack>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </ChakraProvider>
  );
}

export default NewWishModal;
