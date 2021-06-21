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
import { useHistory, BrowserRouter } from 'react-router-dom';
import { useSelectWish } from '../../../hooks/useSelectWish';
import EditWishModal from '../modal/EditWishModal';

function WishesIndex(props) {
  const { wishes, relations, tags } = props;
  // const { selectedWish, selectWish } = useSelectWish();
  const [selectedWish, setSelectedWish] = useState([]);
  const [selectedRelation, setSelectedRelation] = useState([]);
  const [selectedWishTags, setSelectedWishTags] = useState([]);
  const [wishTitle, setWishTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [imageUrl, setImgaeUrl] = useState('');
  const [tag, setTag] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onOpenEdit = () => {
    setIsEditModalOpen(true);
  };
  const onCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  // wish.idを基に該当のwishを選択→モーダル表示
  const onClickSelectWish = (id) => {
    const targetWish = wishes.find((wish) => wish.id === id);
    const targetRelation = relations.filter(
      (relation) => targetWish.id === relation.wish_id
    );
    const relationIds = targetRelation.map((ralation) => {
      return ralation.tag_id;
    });
    const targetTags = tags.filter((tag) => relationIds.includes(tag.id));
    // state更新
    setSelectedWish(targetWish);
    setSelectedRelation(targetRelation);
    setSelectedWishTags(targetTags);
    // モーダルオープン
    onOpen();
  };
  // 更新処理
  const updateWish = (params) => {
    axios.patch(`/wishes/${selectedWish.id}`, {
      wish_title: 'aaa',
      memo: 'aaaa',
      tag_name: '',
      wish_image_id: '',
    });
    axios.delete(`/wish_tag_relationships/destroy`, { selectedRelation });
    axios.post('/tags', {
      tag_name: tag,
    });
    axios.post('/wish_tag_relationships', {
      wish_id: params.wish_id,
      tag_id: params.tag_id,
    });
    setWishTitle('');
    setMemo('');
    setTag('');
    setIsEditModalOpen(false);
    onClose();
  };
  return (
    <ChakraProvider>
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {wishes &&
          wishes.map((wish, id) => (
            <WrapItem key={id}>
              <Box
                w="300px"
                h="300px"
                bg="white"
                borderRadius="10px"
                shadow="md"
                p={4}
                _hover={{ cursor: 'pointer', opacity: 0.8 }}
                onClick={() => onClickSelectWish(wish.id)}
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
                {selectedWishTags.map((tag) => (
                  <Text key={tag.id}>{tag.tag_name}</Text>
                ))}
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onOpenEdit}>Edit</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>

      {isEditModalOpen && (
        <EditWishModal
          isOpen={isOpen}
          onClose={onClose}
          wish={selectedWish}
          tags={selectedWishTags}
          updateWish={updateWish}
        />
      )}
    </ChakraProvider>
  );
}

export default WishesIndex;
