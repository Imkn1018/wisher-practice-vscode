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
import { VFC, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

function NewReviewModal({ wish }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [reviewTitle, setReviewTitle] = useState('');
  const [review, setReview] = useState('');
  const [imageUrl, setImgaeUrl] = useState('');

  const postReview = () => {
    axios.post(`/wishes/${wish.id}/complete_reviews`, {
      review_title: reviewTitle,
      review: review,
      complete_image_id: imageUrl,
    });

    setReviewTitle('');
    setReview('');
    setImgaeUrl('');
    onClose();
  };
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
                setReviewTitle('');
                setReview('');
                setImgaeUrl('');
              }}
            />
            <ModalBody mx={4}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>review</FormLabel>
                  <Input
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
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
            <ModalFooter>
              <Button onClick={postReview}></Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </ChakraProvider>
  );
}

export default NewReviewModal;
