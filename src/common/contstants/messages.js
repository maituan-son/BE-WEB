const MESSAGES = {
  GENERAL: {
    SUCCESS: "Thành công",
    SERVER_ERROR: "Lỗi server, vui lòng thử lại sau",
    NOT_FOUND: "Không tìm thấy tài nguyên",
    BAD_REQUEST: "Yêu cầu không hợp lệ",
    UNAUTHORIZED: "Không được phép truy cập",
    FORBIDDEN: "Truy cập bị cấm",
  },
  BRAND: {
    CREATE_ERROR_EXISTS: "Thương hiệu đã tồn tại",
    CREATE_SUCCESS: "Tạo thương hiệu thành công",
    GET_SUCCESS: "Lấy danh sách thương hiệu thành công",
    NOT_FOUND: "Không tìm thấy thương hiệu",
    UPDATE_SUCCESS: "Cập nhật thương hiệu thành công",
    DELETE_SUCCESS: "Xóa thương hiệu thành công",
    SOFT_DELETE_SUCCESS: "Xóa mềm thương hiệu thành công",
    SOFT_DELETE_ERROR: "Xóa mềm thương hiệu thất bại",
    RESTORE_SUCCESS: "Khôi phục thương hiệu thành công",
    RESTORE_ERROR: "Khôi phục thương hiệu thất bại",
  },
  NEWS: {
    CREATE_SUCCESS: "Tạo tin tức thành công",
    CREATE_ERROR_EXISTS: "Tin tức đã tồn tại",
    GET_SUCCESS: "Lấy danh sách tin tức thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin tin tức thành công",
    UPDATE_SUCCESS: "Cập nhật tin tức thành công",
    DELETE_SUCCESS: "Xóa tin tức thành công",
    NOT_FOUND: "Không tìm thấy tin tức",
    NAME_REQUIRED: "Tên tin tức là bắt buộc",
    CONTENT_REQUIRED: "Nội dung tin tức là bắt buộc",
  },
  BANNER: {
    CREATE_SUCCESS: "Tạo banner thành công",
    CREATE_ERROR_EXISTS: "Banner đã tồn tại",
    GET_LIST_SUCCESS: "Lấy danh sách banner thành công",
    GET_SUCCESS: "Lấy thông tin banner thành công",
    UPDATE_SUCCESS: "Cập nhật banner thành công",
    DELETE_SUCCESS: "Xóa banner thành công",
    NOT_FOUND: "Không tìm thấy banner",
    NAME_REQUIRED: "Tên banner là bắt buộc",
    IMAGE_REQUIRED: "Hình ảnh banner là bắt buộc",
  },
  VOUCHER: {
    CREATE_SUCCESS: "Tạo mã giảm giá thành công",
    CREATE_ERROR_EXISTS: "Mã giảm giá đã tồn tại",
    GET_SUCCESS: "Lấy danh sách mã giảm giá thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin mã giảm giá thành công",
    UPDATE_SUCCESS: "Cập nhật mã giảm giá thành công",
    DELETE_SUCCESS: "Xóa mã giảm giá thành công",
    NOT_FOUND: "Không tìm thấy mã giảm giá",
    CODE_REQUIRED: "Mã giảm giá là bắt buộc",
    DISCOUNT_REQUIRED: "Giảm giá là bắt buộc",
  },
  AUTH: {
    LOGIN_SUCCESS: "Đăng nhập thành công",
    LOGOUT_SUCCESS: "Đăng xuất thành công",
    REGISTER_SUCCESS: "Đăng ký thành công",
    LOGIN_FAILED: "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin",
    REGISTER_FAILED: "Đăng ký thất bại, vui lòng thử lại",
    UNAUTHORIZED: "Bạn cần đăng nhập để thực hiện hành động này",
    INVALID_TOKEN: "Token không hợp lệ hoặc đã hết hạn",
    EMAIL_NOT_VERIFIED: "Email chưa được xác minh",
    EMAIL_VERIFIED: "Email đã được xác minh",
    PASSWORD_RESET_SUCCESS: "Đặt lại mật khẩu thành công",
    PASSWORD_RESET_FAILED: "Đặt lại mật khẩu thất bại, vui lòng thử lại",
    PASSWORD_CHANGE_SUCCESS: "Đổi mật khẩu thành công",
    PASSWORD_CHANGE_FAILED: "Đổi mật khẩu thất bại, vui lòng thử lại",
    EMAIL_ALREADY_EXISTS: "Email đã được sử dụng",
    USERNAME_ALREADY_EXISTS: "Tên người dùng đã được sử dụng",
    INVALID_EMAIL: "Email không hợp lệ",
    INVALID_PASSWORD: "Mật khẩu không hợp lệ",
    AUTH_ACCOUNT_INACTIVE:
      "Tài khoản của bạn chưa được kích hoạt hoặc đã bị vô hiệu hóa",
  },
  USER: {
    GET_SUCCESS: "Lấy danh sách người dùng thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin người dùng thành công",
    CREATE_SUCCESS: "Tạo người dùng thành công",
    UPDATE_SUCCESS: "Cập nhật người dùng thành công",
    DELETE_SUCCESS: "Xóa người dùng thành công",
    NOT_FOUND: "Không tìm thấy người dùng",
    NAME_REQUIRED: "Tên người dùng là bắt buộc",
    EMAIL_REQUIRED: "Email là bắt buộc",
    EMAIL_EXISTS: "Email đã tồn tại",
    INVALID_CREDENTIALS: "Thông tin đăng nhập không hợp lệ",
  },
  PRODUCT: {
    GET_SUCCESS: "Lấy danh sách sản phẩm thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin sản phẩm thành công",
    CREATE_SUCCESS: "Tạo sản phẩm thành công",
    UPDATE_SUCCESS: "Cập nhật sản phẩm thành công",
    DELETE_SUCCESS: "Xóa sản phẩm thành công",
    CREATE_ERROR: "Lỗi khi tạo sản phẩm",
    UPDATE_ERROR: "Lỗi khi cập nhật sản phẩm",
    DELETE_ERROR: "Lỗi khi xóa sản phẩm",
    CREATE_ERROR_EXISTS: "Sản phẩm đã tồn tại",
    NOT_FOUND: "Không tìm thấy sản phẩm",
    NAME_REQUIRED: "Tên sản phẩm là bắt buộc",
    PRICE_REQUIRED: "Giá sản phẩm là bắt buộc",
    INVALID_PRICE: "Giá sản phẩm không hợp lệ",
  },

  CATEGORY: {
    GET_SUCCESS: "Lấy danh sách danh mục thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin danh mục thành công",
    CREATE_SUCCESS: "Tạo danh mục thành công",
    SOFT_DELETE_SUCCESS: "Xóa mềm danh mục thành công",
    RESTORE_SUCCESS: "Khôi phục danh mục thành công",
    SOFT_DELETE_FAILED: "Xóa mềm danh mục thất bại",
    RESTORE_FAILED: "Khôi phục danh mục thất bại",
    CREATE_ERROR: "Lỗi khi tạo danh mục",
    CREATE_ERROR_EXISTS: "Danh mục đã tồn tại",
    UPDATE_SUCCESS: "Cập nhật danh mục thành công",
    DELETE_SUCCESS: "Xóa danh mục thành công",
    NOT_FOUND: "Không tìm thấy danh mục",
    NAME_REQUIRED: "Tên danh mục là bắt buộc",
    HAS_SUBCATEGORIES: "Danh mục này có danh mục con, không thể xóa",
  },

  SUBCATEGORY: {
    GET_SUCCESS: "Lấy danh sách danh mục con thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin danh mục con thành công",
    CREATE_SUCCESS: "Tạo danh mục con thành công",
    UPDATE_SUCCESS: "Cập nhật danh mục con thành công",
    DELETE_SUCCESS: "Xóa danh mục con thành công",
    CREATE_ERROR: "Lỗi khi tạo danh mục con",
    UPDATE_ERROR: "Lỗi khi cập nhật danh mục con",
    DELETE_ERROR: "Lỗi khi xóa danh mục con",
    CREATE_ERROR_EXISTS: "Danh mục con đã tồn tại",
    NOT_FOUND: "Không tìm thấy danh mục con",
    NAME_REQUIRED: "Tên danh mục con là bắt buộc",
  },

  ATTRIBUTE: {
    GET_SUCCESS: "Lấy danh sách thuộc tính thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin thuộc tính thành công",
    CREATE_SUCCESS: "Tạo thuộc tính thành công",
    UPDATE_SUCCESS: "Cập nhật thuộc tính thành công",
    DELETE_SUCCESS: "Xóa thuộc tính thành công",
    CREATE_ERROR_PARENT_ID: "Danh mục cha là bắt buộc",
    CREATE_ERROR: "Lỗi khi tạo thuộc tính",
    UPDATE_ERROR: "Lỗi khi cập nhật thuộc tính",
    DELETE_ERROR: "Lỗi khi xóa thuộc tính",
    CREATE_ERROR_EXISTS: "Thuộc tính đã tồn tại",
    NOT_FOUND: "Không tìm thấy thuộc tính",
    NAME_REQUIRED: "Tên thuộc tính là bắt buộc",
    VALUE_REQUIRED: "Giá trị thuộc tính là bắt buộc",
  },

  ORDER: {
    GET_SUCCESS: "Lấy danh sách đơn hàng thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin đơn hàng thành công",
    CREATE_SUCCESS: "Tạo đơn hàng thành công",
    UPDATE_SUCCESS: "Cập nhật đơn hàng thành công",
    DELETE_SUCCESS: "Xóa đơn hàng thành công",
    CREATE_ERROR: "Lỗi khi tạo đơn hàng",
    UPDATE_ERROR: "Lỗi khi cập nhật đơn hàng",
    DELETE_ERROR: "Lỗi khi xóa đơn hàng",
    CREATE_ERROR_EXISTS: "Đơn hàng đã tồn tại",
    NOT_FOUND: "Không tìm thấy đơn hàng",
    INVALID_STATUS: "Trạng thái đơn hàng không hợp lệ",
  },

  EMAIL: {
    SEND_SUCCESS: "Gửi email thành công",
    SEND_FAILED: "Gửi email thất bại, vui lòng thử lại sau",
    VERIFICATION_SUBJECT: "Xác minh tài khoản của bạn",
    RESET_PASSWORD_SUBJECT: "Đặt lại mật khẩu cho tài khoản của bạn",
    VERIFICATION_BODY:
      "Vui lòng nhấp vào liên kết sau để xác minh tài khoản của bạn: ",
    RESET_PASSWORD_BODY:
      "Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào link dưới đây để tiếp tục: ",
  },
  PRODUCT_VARIANT: {
    CREATE_SUCCESS: "Tạo biến thể sản phẩm thành công",
    CREATE_ERROR_EXISTS: "Biến thể sản phẩm đã tồn tại",
    GET_SUCCESS: "Lấy danh sách biến thể sản phẩm thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin biến thể sản phẩm thành công",
    UPDATE_SUCCESS: "Cập nhật biến thể sản phẩm thành công",
    DELETE_SUCCESS: "Xóa biến thể sản phẩm thành công",
    NOT_FOUND: "Không tìm thấy biến thể sản phẩm",
  },
  ATTRIBUTE_VALUE: {
    CREATE_SUCCESS: "Tạo giá trị thuộc tính thành công",
    CREATE_ERROR_EXISTS: "Giá trị thuộc tính đã tồn tại",
    GET_SUCCESS: "Lấy danh sách giá trị thuộc tính thành công",
    GET_BY_ID_SUCCESS: "Lấy thông tin giá trị thuộc tính thành công",
    UPDATE_SUCCESS: "Cập nhật giá trị thuộc tính thành công",
    DELETE_SUCCESS: "Xóa giá trị thuộc tính thành công",
    NOT_FOUND: "Không tìm thấy giá trị thuộc tính",
  },
};

export default MESSAGES;
