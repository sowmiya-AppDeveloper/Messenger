if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/home/bi1466/.gradle/caches/transforms-3/32b9d5f4760a4d065d6541802a97f8c7/transformed/jetified-fbjni-0.5.1/prefab/modules/fbjni/libs/android.armeabi-v7a/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/bi1466/.gradle/caches/transforms-3/32b9d5f4760a4d065d6541802a97f8c7/transformed/jetified-fbjni-0.5.1/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

