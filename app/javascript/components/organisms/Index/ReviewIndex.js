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
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import React from 'react';
import {
  memo,
  VFC,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
} from 'react';
import axios from 'axios';
import EditReviewModal from '../modal/EditReviewModal';

function ReviewIndex(props) {
  const { wish, completeReviews } = props;
  // const { selectedReview, selectreview } = useSelectreview();
  const [reviewTitle, setReviewTitle] = useState('');
  const [review, setReview] = useState('');
  const [imageUrl, setImgaeUrl] = useState('');

  const [reviews, setReviews] = useState(completeReviews);
  const [selectedReview, setSelectedReview] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  // const getAllRevies = () => {
  //   // 新規登録し終わったら
  //   axios.get('1/complete_reviews').then((res) => {
  //     console.log(reviews);
  //   });
  // };
  const postReview = (params) => {
    axios.post(`/wishes/${wish.id}/complete_reviews`, {
      review_title: reviewTitle,
      review: review,
      complete_image_id: imageUrl,
    });
    // .then(axios.get('1/complete_reviews'))
    // .then((res) => {
    //   setReviews([...reviews, res.data]);
    //   console.log(res.data);
    // });
    const newReviews = [
      ...reviews,
      {
        id: reviews.slice(-1)[0].id + 1,
        wish_id: wish.id,
        review_title: reviewTitle,
        review: review,
        complete_image_id: imageUrl,
      },
    ];
    setReviews(newReviews);
    console.log(reviews);
    setReviewTitle('');
    setReview('');
    setImgaeUrl('');
    onClose();
  };
  console.log(reviews);
  // useEffect(() => {
  //   getAllRevies();
  // }, []);
  const onOpenCreate = () => {
    setIsCreateModalOpen(true);
    console.log(isCreateModalOpen);
    onOpen();
  };
  const onCloseCreate = () => {
    setIsCreateModalOpen(false);
  };
  const onOpenEdit = () => {
    setIsEditModalOpen(true);
  };
  const onCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  // review.idを基に該当のreviewを選択→モーダル表示
  const onClickSelectReview = (id) => {
    const targetReview = reviews.find((review) => review.id === id);

    // state更新
    setSelectedReview(targetReview);
    // モーダルオープン
    onOpen();
  };
  // 更新処理
  const updateReview = () => {
    axios.patch(`/wishes/${wish.id}/complete_reviews/${selectedReview.id}`, {
      review_title: selectedReview?.review_title,
      review: selectedReview?.review,
      complete_image_id: selectedReview?.imageUrl,
    });
    const updatedReviews = [...reviews];
    //   {
    //     id: selectedReview?.id,
    //     wish_id: wish.id,
    //     review_title: selectedReview?.review_title,
    //     review: selectedReview?.review,
    //     complete_image_id: selectedReview?.imageUrl,
    //   },
    // ];
    // updatedReviews[selectedReview.id] = {
    //   review_title: selectedReview?.review_title,
    //   review: selectedReview?.review,
    //   complete_image_id: selectedReview?.imageUrl,
    };
    setReviews(updatedReviews);
    setReviewTitle('');
    setReview('');
    setIsEditModalOpen(false);
    onClose();
  };
  return (
    <ChakraProvider>
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {reviews &&
          reviews.map((review, id) => (
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
                  onClickSelectReview(review.id);
                }}
              >
                <Stack textAlign="center">
                  <Image
                    boxSize="160px"
                    borderRadius="full"
                    src={review.image}
                    alt={review.review_title}
                    m="auto"
                  />
                  <Text fontSize="lg" fontWeight="bold">
                    {review.review_title}
                  </Text>
                  <Text fontSize="sm" color="gray">
                    {review.memo}
                  </Text>
                </Stack>
              </Box>
            </WrapItem>
          ))}
      </Wrap>
      <button onClick={onOpenCreate}>Create</button>
      {isCreateModalOpen === false && (
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
                    alt={selectedReview?.review_title}
                    m="auto"
                  />
                  <Text fontSize="lg" fontWeight="bold">
                    {selectedReview?.review_title}
                  </Text>
                  <Text fontSize="sm" color="gray">
                    {selectedReview?.review}
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

      {isCreateModalOpen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          autoFocus={false}
          motionPreset="scale"
        >
          <ModalOverlay>
            <ModalContent pb={2}>
              <ModalHeader>Create Review</ModalHeader>
              <ModalCloseButton
                onClick={() => {
                  setReviewTitle('');
                  setReview('');
                  setImgaeUrl('');
                  onCloseCreate();
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
      )}
      {isEditModalOpen && (
        <EditReviewModal
          isOpen={isOpen}
          onClose={onClose}
          selectedReview={selectedReview}
          updateReview={updateReview}
        />
      )}
    </ChakraProvider>
  );
}

export default ReviewIndex;
