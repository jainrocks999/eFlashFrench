import { ErrorCode } from "react-native-iap";
 export default  (errorCode) => {
    switch (errorCode) {
      case ErrorCode.E_USER_CANCELLED:
        return 'The purchase was cancelled by the user.';
      case ErrorCode.E_UNKNOWN:
        return 'An unknown error occurred. Please try again.';
      case ErrorCode.E_SERVICE_ERROR:
        return 'There was a problem with the payment service. Please try again later.';
      case ErrorCode.E_NETWORK_ERROR:
        return 'There was a network error. Please check your internet connection and try again.';
      case ErrorCode.E_ALREADY_OWNED:
        return 'You already own this item.';
      case ErrorCode.E_USER_ERROR:
        return 'There was an error with the user input. Please check and try again.';
      case ErrorCode.E_ITEM_UNAVAILABLE:
        return 'The item is currently unavailable.';
      case ErrorCode.E_REMOTE_ERROR:
        return 'There was a remote error. Please try again later.';
      case ErrorCode.E_RECEIPT_FAILED:
        return 'Failed to process the receipt. Please try again.';
      case ErrorCode.E_RECEIPT_FINISHED_FAILED:
        return 'Failed to finish processing the receipt. Please try again.';
      case ErrorCode.E_NOT_PREPARED:
        return 'The app is not prepared for in-app purchases. Please try again later.';
      case ErrorCode.E_NOT_ENDED:
        return 'The purchase process was not completed. Please try again.';
      case ErrorCode.E_DEVELOPER_ERROR:
        return 'There was a developer error. Please contact support.';
      case ErrorCode.E_BILLING_RESPONSE_JSON_PARSE_ERROR:
        return 'There was an error parsing the billing response. Please try again.';
      case ErrorCode.E_DEFERRED_PAYMENT:
        return 'The payment is deferred. Please wait for confirmation.';
      case ErrorCode.E_INTERRUPTED:
        return 'The purchase was interrupted. Please try again.';
      case ErrorCode.E_IAP_NOT_AVAILABLE:
        return 'In-app purchases are not available. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  };