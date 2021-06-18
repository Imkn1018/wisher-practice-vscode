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

function WishesEdit({ image, title, memo, nextPath }) {
  const [wishes, setWishes] = useState([]);
  const history = useHistory();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const onClickEdit = useCallback(() => history.push('/spa/wishes'), [history]);
  return <div>edit</div>;
}

export default WishesEdit;
