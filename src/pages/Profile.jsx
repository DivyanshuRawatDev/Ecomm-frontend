import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  IconButton,
  useColorModeValue,
  Tooltip,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, Springfield",
    image: "https://via.placeholder.com/150",
  });
  const [editMode, setEditMode] = useState({
    name: false,
    address: false,
    image: false,
  });

  const {user} = useSelector((store) => store?.user);
  console.log(user.userData,"user")

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setProfile({
          ...profile,
          image: upload.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = (field) => {
    setEditMode({
      ...editMode,
      [field]: !editMode[field],
    });
  };

  const handleSave = async (field) => {
    try {
      let response;
      switch (field) {
        case "name":
          response = await updateName(profile.name);
          break;
        case "address":
          response = await updateAddress(profile.address);
          break;
        case "image":
          response = await updateImage(profile.image);
          break;
        default:
          return;
      }
      if (response.success) {
        toggleEditMode(field);
        toast({
          title: `${field.charAt(0).toUpperCase() + field.slice(1)} updated.`,
          description: `Your ${field} has been successfully updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: `Error updating ${field}.`,
        description: `An error occurred while updating your ${field}. Please try again.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const updateName = async (name) => {
    // API call to update name
    return { success: true };
  };

  const updateAddress = async (address) => {
    // API call to update address
    return { success: true };
  };

  const updateImage = async (image) => {
    // API call to update image
    return { success: true };
  };

  const openFileDialog = () => {
    document.getElementById("imageInput").click();
  };

  return (
    <Box
      minHeight="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      className="flex items-center justify-center p-8"
    >
      <Box
        className="w-full max-w-md p-6 rounded-lg shadow-lg"
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("gray.300", "gray.700")}
        borderWidth="1px"
      >
        <Flex direction="column" align="center">
          <Heading
            as="h1"
            size="xl"
            className="mb-4 text-gray-900 dark:text-gray-400"
          >
            Profile
          </Heading>
          <Box className="relative mb-4">
            <Avatar
              size="2xl"
              src={profile.image}
              className="cursor-pointer"
              onClick={() => toggleEditMode("image")}
            />
            {editMode.image && (
              <Box className="absolute top-0 right-0">
                <Tooltip label="Change Image" aria-label="Change Image">
                  <IconButton
                    icon={<CheckIcon />}
                    onClick={openFileDialog}
                    size="sm"
                    aria-label="Change Image"
                    colorScheme="teal"
                    className="mr-2"
                  />
                </Tooltip>
                <Tooltip label="Cancel" aria-label="Cancel">
                  <IconButton
                    icon={<CloseIcon />}
                    onClick={() => toggleEditMode("image")}
                    size="sm"
                    aria-label="Cancel"
                    colorScheme="red"
                  />
                </Tooltip>
              </Box>
            )}
            <input
              type="file"
              id="imageInput"
              className="hidden"
              onChange={handleImageChange}
            />
          </Box>
          <VStack spacing={4} className="w-full">
            <FormControl id="name" className="mb-4" isRequired>
              <FormLabel className="text-gray-900 dark:text-gray-200">
                Name
              </FormLabel>
              <HStack>
                <Input
                  name="name"
                  placeholder="Your Name"
                  className="bg-gray-100 dark:bg-gray-700"
                  size="lg"
                  variant="filled"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500" }}
                  value={profile.name}
                  onChange={handleChange}
                  isReadOnly={!editMode.name}
                />
                {editMode.name ? (
                  <Tooltip label="Save" aria-label="Save">
                    <IconButton
                      icon={<CheckIcon />}
                      onClick={() => handleSave("name")}
                      size="sm"
                      aria-label="Save Name"
                      colorScheme="teal"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip label="Edit" aria-label="Edit">
                    <IconButton
                      icon={<EditIcon />}
                      onClick={() => toggleEditMode("name")}
                      size="sm"
                      aria-label="Edit Name"
                      colorScheme="gray"
                    />
                  </Tooltip>
                )}
              </HStack>
            </FormControl>
            <FormControl id="email" className="mb-4" isRequired>
              <FormLabel className="text-gray-900 dark:text-gray-200">
                Email
              </FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                className="bg-gray-100 dark:bg-gray-700"
                size="lg"
                variant="filled"
                focusBorderColor="teal.400"
                _placeholder={{ color: "gray.500" }}
                value={user?.userData?.email}
                isReadOnly
              />
            </FormControl>
            <FormControl id="address" className="mb-4" isRequired>
              <FormLabel className="text-gray-900 dark:text-gray-200">
                Address
              </FormLabel>
              <HStack>
                <Input
                  name="address"
                  placeholder="Your Address"
                  className="bg-gray-100 dark:bg-gray-700"
                  size="lg"
                  variant="filled"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500" }}
                  value={profile.address}
                  onChange={handleChange}
                  isReadOnly={!editMode.address}
                />
                {editMode.address ? (
                  <Tooltip label="Save" aria-label="Save">
                    <IconButton
                      icon={<CheckIcon />}
                      onClick={() => handleSave("address")}
                      size="sm"
                      aria-label="Save Address"
                      colorScheme="teal"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip label="Edit" aria-label="Edit">
                    <IconButton
                      icon={<EditIcon />}
                      onClick={() => toggleEditMode("address")}
                      size="sm"
                      aria-label="Edit Address"
                      colorScheme="gray"
                    />
                  </Tooltip>
                )}
              </HStack>
            </FormControl>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Profile;
