import * as utils from "./shared";
import use from "./core/use";
import mock from "./core";
import integer from "./random/basic/integer";
import char from "./random/basic/char";
import mockString from "./random/basic/string";
import mockBoolean from "./random/basic/boolean";
import float from "./random/basic/float";
import province from "./random/address/province";

/**
 * 基础部分
 */
use(integer);
use(mockBoolean);
use(char);
use(mockString);
use(float);
/**
 * 地址
 */
use(province);

export { utils, use, mock };
