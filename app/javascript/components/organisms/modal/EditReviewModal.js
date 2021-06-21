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
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function EditReviewModal(props) {
  const { selectedReview, isOpen, onClose, updateReview } = props;
  const [reviewTitle, setReviewTitle] = useState('');
  const [review, setReview] = useState('');
  const [imageUrl, setImgaeUrl] = useState('');

  useEffect(() => {
    setReviewTitle(selectedReview?.review_title ?? '');
    setReview(selectedReview?.review ?? '');
    setImgaeUrl(selectedReview?.review_image_id ?? '');
  }, [selectedReview]);
  return (
    <ChakraProvider>
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
                  <FormLabel>レビュータイトル</FormLabel>
                  <Input
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>レビュー</FormLabel>
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
              <Button onClick={updateReview}></Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </ChakraProvider>
  );
}

export default EditReviewModal;
