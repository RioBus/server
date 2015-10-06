import IResource = require("../iResource");
import IService  = require("../../service/iService");
import $inject   = require("../../core/inject");

declare var Strings;
/**
 * SearchResource class
 *
 * Defines a Resource and it's characteristics
 * @class SearchResource
 */
class SearchResource implements IResource{
    
    public constructor(private context: IService = $inject("service/searchService")) {}

    /**
     * GET method handler
     *
     * @param request
     * @param response
     * @param next
     */
    public get(request: any, response: any, next: any): void {
        var searchData: any = request.params.data;
        var userAgent: string = request.params.platformId;
        response.jsonp(this.context.retrieve(userAgent, searchData));
    }

    /**
     * Gets the given platform name
     * @param {number} platform
     * @returns {string}
     */
    private getPlatformName(platform: number){
        let text = Strings.business.search.platform;
        switch(platform){
            case 1: return text.web;
            case 2: return text.mobile;
            case 3: return text.legacy;
            default: return text.notSet;
        }
    }

    /**
     * POST method handler
     *
     * @param request
     * @param response
     * @param next
     */
    public post(request: any, response: any, next: any): void {
        response.json({type: "error", message: "Operation not implemented"});
    }

    /**
     * PUT method handler
     *
     * @param request
     * @param response
     * @param next
     */
    public put(request: any, response: any, next: any): void {
        response.json({type: "error", message: "Operation not implemented"});
    }

    /**
     * DELETE method handler
     *
     * @param request
     * @param response
     * @param next
     */
    public delete(request: any, response: any, next: any): void {
        response.json({type: "error", message: "Operation not implemented"});
    }
}
export = SearchResource;