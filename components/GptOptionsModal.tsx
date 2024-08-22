import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Checkbox,  // Import Checkbox
} from "@nextui-org/react";

interface GptOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (options: GptOptions) => void;
}

export interface GptOptions {
  customToken: string;
  customInstruction: string;
  inherentAttributes: string;
  overridePrompt: boolean;  // Add overridePrompt to GptOptions interface
}

export default function GptOptionsModal({
  isOpen,
  onClose,
  onApply,
}: GptOptionsModalProps) {
  const [customToken, setCustomToken] = useState("");
  const [customInstruction, setCustomInstruction] = useState("");
  const [inherentAttributes, setInherentAttributes] = useState("");
  const [overridePrompt, setOverridePrompt] = useState(false);  // State for override toggle

  useEffect(() => {
    // Load saved options from localStorage
    const savedOptions = localStorage.getItem("gptOptions");

    if (savedOptions) {
      const { customToken, customInstruction, inherentAttributes, overridePrompt } =
        JSON.parse(savedOptions);

      setCustomToken(customToken || "");
      setCustomInstruction(customInstruction || "");
      setInherentAttributes(inherentAttributes || "");
      setOverridePrompt(overridePrompt || false);  // Load saved overridePrompt state
    }
  }, []);

  const handleApply = () => {
    const options = { customToken, customInstruction, inherentAttributes, overridePrompt };

    localStorage.setItem("gptOptions", JSON.stringify(options));
    onApply(options);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>GPT Captioning Options</ModalHeader>
        <ModalBody>
          <Textarea
            label="Inherent Attributes (Optional)"
            placeholder="Enter inherent attributes to avoid"
            value={inherentAttributes}
            onChange={(e) => setInherentAttributes(e.target.value)}
          />
          <Input
            label="Custom Token (Recommended but optional)"
            placeholder="Enter custom token"
            value={customToken}
            onChange={(e) => setCustomToken(e.target.value)}
          />
          <Textarea
            label="Custom Instruction (Optional)"
            placeholder="Enter custom instruction"
            value={customInstruction}
            onChange={(e) => setCustomInstruction(e.target.value)}
          />
          <Checkbox
            isSelected={overridePrompt}
            onChange={(e) => setOverridePrompt(e.target.checked)}  // Correctly handle the event
          >
            Override Base Prompt
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleApply}>
            Apply
          </Button>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}